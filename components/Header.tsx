import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router";

interface Props {
  title: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
}

const Header = ({ title, description, ctaText, ctaUrl }: Props) => {
  return (
    <header className="flex flex-col gap-5 md:flex-row justify-between w-full">
      <article className="flex flex-col gap-3.5 w-full">
        <h1 className="text-dark-100 text-xl md:text-2xl font-semibold">
          {title}
        </h1>
        {description && (
          <p className="text-gray-100 text-sm md:text-lg">{description}</p>
        )}
      </article>

      {ctaText && ctaUrl && (
        <Link to={ctaUrl}>
          <Button
            variant="contained"
            startIcon={<Add />}
            className="whitespace-nowrap"
          >
            {ctaText}
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
