import { TextArea, useBreakPoint, useWindowSize } from "../lib/main";

export function App() {
  const breakpoint = useBreakPoint();
  const [width, height] = useWindowSize();
  const str = `Breakpoint: ${breakpoint}, Width: ${width}, Height: ${height}`;
  return <TextArea value={str} />;
}
