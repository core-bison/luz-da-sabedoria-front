"use client";

import { useRef, useState } from "react";
import { FileUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileInputProps {
  id: string;
  name: string;
  /** Extensões aceitas, ex.: [".pdf", ".docx"] */
  accept: string[];
  maxSizeMB: number;
  required?: boolean;
  /** Texto de apoio, ex.: "PDF, DOC ou ZIP até 20 MB" */
  hint: string;
  onFileChange?: (file: File | null) => void;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

/** Seletor de arquivo com arrastar e soltar e validação de tipo e tamanho no navegador. */
export function FileInput({ id, name, accept, maxSizeMB, required, hint, onFileChange }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const select = (next: File | null) => {
    setError(null);
    if (next) {
      const extension = `.${next.name.split(".").pop()?.toLowerCase()}`;
      if (!accept.includes(extension)) {
        setError(`Formato não aceito. Use ${accept.join(", ")}.`);
        next = null;
      } else if (next.size > maxSizeMB * 1024 * 1024) {
        setError(`Arquivo maior que ${maxSizeMB} MB.`);
        next = null;
      }
    }
    if (!next && inputRef.current) inputRef.current.value = "";
    setFile(next);
    onFileChange?.(next);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (!dropped || !inputRef.current) return;
    // Sincroniza o arquivo solto com o input, para que ele seja enviado com o formulário
    const transfer = new DataTransfer();
    transfer.items.add(dropped);
    inputRef.current.files = transfer.files;
    select(dropped);
  };

  return (
    <div>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept={accept.join(",")}
        required={required}
        aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
        onChange={(e) => select(e.target.files?.[0] ?? null)}
        className="peer sr-only"
      />

      {file ? (
        <div className="flex items-center gap-3 rounded-sm border border-line-strong bg-white px-4 py-3">
          <FileUp aria-hidden className="size-5 shrink-0 text-gold-deep" />
          <div className="min-w-0 grow">
            <p className="truncate text-sm font-medium text-navy">{file.name}</p>
            <p className="text-xs text-muted">{formatBytes(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => select(null)}
            aria-label={`Remover ${file.name}`}
            className="inline-flex size-8 items-center justify-center rounded-sm text-muted hover:bg-paper hover:text-danger"
          >
            <X aria-hidden className="size-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed px-6 py-10 text-center transition-colors",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
            isDragging ? "border-navy bg-navy-50" : "border-line-strong hover:border-navy hover:bg-paper",
          )}
        >
          <FileUp aria-hidden className="size-6 text-gold-deep" />
          <span className="mt-3 text-sm font-medium text-navy">Selecionar arquivo ou arrastar aqui</span>
        </label>
      )}

      <p id={`${id}-hint`} className="mt-2 text-xs text-muted">
        {hint}
      </p>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
