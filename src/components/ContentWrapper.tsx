interface Props {
  content: string;
  children?: React.ReactNode;
}

export default function ContentWrapper({ content, children }: Props) {
  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: content ?? "" }} />
      {children}
    </article>
  );
}
