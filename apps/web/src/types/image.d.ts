declare module '*.svg' {
  const value: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
  export default value;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif' {
  const value: string;
  export = value;
}
declare module '*.webp' {
  const value: string;
  export = value;
}
