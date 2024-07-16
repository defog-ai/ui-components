// A component that gives bare bones drop files functionality
// without much UI

export function DropFilesHeadless({
  children,
  disabled = false,
  onDrop = (...args) => {},
  onFileSelect = (...args) => {},
  onDragOver = (...args) => {},
  onDragEnter = (...args) => {},
  onDragLeave = (...args) => {},
  rootClassNames = "",
}) {
  return (
    <div className={rootClassNames}>
      <div
        className="relative cursor-pointer"
        onDrop={(e) => onDrop(e)}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDragLeave(e);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          onDragEnter(e);
        }}
        onDragOver={(e) => {
          // Prevent default behavior (Prevent file from being opened)
          e.preventDefault();
          onDragOver(e);
        }}
      >
        <input
          aria-label=""
          accept="text/csv"
          className="w-full h-full z-[1] opacity-0 absolute left-0 top-0 cursor-pointer"
          type="file"
          disabled={disabled}
          onInput={(e) => {
            e.preventDefault();
            if (disabled) return;
            onFileSelect(e);
          }}
        ></input>
        {children}
      </div>
    </div>
  );
}
