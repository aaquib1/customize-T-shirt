import { Suspense } from "react";
import CustomizeApp from "./CustomizeApp";

export default function CustomizePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <CustomizeApp />
    </Suspense>
  );
}
