type Props = {
  markup: string;
};

const Markup = ({ markup }: Props) => {
  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-xl
        prose-h2:mb-2 prose-h2:mt-6 prose-h3:mb-1 prose-h3:mt-4
        prose-p:text-neutral-700 dark:prose-p:text-neutral-500
        prose-p:text-[18px] prose-p:leading-relaxed
        prose-p:font-spectral
        [&>blockquote:not(.pull-quote)]:border-l-4 [&>blockquote:not(.pull-quote)]:border-cool-red
        [&>blockquote:not(.pull-quote)]:pl-6 [&>blockquote:not(.pull-quote)]:font-baskerville
        [&>blockquote:not(.pull-quote)]:not-italic [&>blockquote:not(.pull-quote)_p]:before:content-none
        [&>blockquote:not(.pull-quote)_p]:after:content-none
        [&>ul>li>p:last-child]:m-0
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
        prose-code:text-primary prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-800
        prose-img:rounded-lg prose-img:border prose-img:border-neutral-200 dark:prose-img:border-neutral-700"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};

export default Markup;
