/**
 * Draw-to-sign canvas backed by signature_pad (pointer events, so mouse,
 * touch, and stylus all work). Exposes the drawing as a PNG data URI via
 * onChange (null while empty/cleared).
 */
import { useEffect, useRef } from "react";
import SignaturePad from "signature_pad";
import { Eraser } from "lucide-react";

const SignatureCanvas = ({ onChange }: { onChange: (dataUrl: string | null) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const padRef = useRef<SignaturePad | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pad = new SignaturePad(canvas, {
      penColor: "#1e293b",
      backgroundColor: "rgba(255,255,255,0)",
    });
    padRef.current = pad;

    // Scale the backing store for sharp strokes on high-DPI screens. Must run
    // before any drawing and again on resize (resize clears the canvas).
    const resize = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d")?.scale(ratio, ratio);
      pad.clear();
      onChangeRef.current(null);
    };
    resize();
    window.addEventListener("resize", resize);

    const emit = () => {
      onChangeRef.current(pad.isEmpty() ? null : pad.toDataURL("image/png"));
    };
    pad.addEventListener("endStroke", emit);

    return () => {
      window.removeEventListener("resize", resize);
      pad.off();
    };
  }, []);

  const clear = () => {
    padRef.current?.clear();
    onChangeRef.current(null);
  };

  return (
    <div>
      <div className="relative rounded-xl border-2 border-dashed border-slate-300 bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-40 touch-none rounded-xl"
          aria-label="Signature area — draw your signature here"
        />
        <span className="pointer-events-none absolute bottom-2 left-0 right-0 text-center text-xs text-slate-400">
          Sign here
        </span>
      </div>
      <button
        type="button"
        onClick={clear}
        className="mt-2 inline-flex items-center text-sm text-rogue-slate hover:text-rogue-red transition-colors"
      >
        <Eraser className="h-4 w-4 mr-1.5" /> Clear signature
      </button>
    </div>
  );
};

export default SignatureCanvas;
