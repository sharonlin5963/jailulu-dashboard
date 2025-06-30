interface Props {
  title: string;
  description: string;
}

const Header = ({ title, description }: Props) => {
  return (
    <header className="flex flex-col gap-5 md:flex-row justify-between w-full">
      <article className="flex flex-col gap-3.5 w-full">
        <h1 className="text-dark-100 text-xl md:text-2xl font-semibold">
          {title}
        </h1>
        <p className="text-gray-100 text-sm md:text-lg">{description}</p>
      </article>
    </header>
  );
};

export default Header;
