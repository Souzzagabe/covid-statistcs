import { useAppContext } from "../../contexts/useAppContext";

const Footer = () => {
  const { theme } = useAppContext();

  return (
    <div className="flex align-center justify-center p-5">
      <p className={`text-black text-center font-bold h-8 ${theme === "dark" ? "text-white" : "text-black"}`}>
        ©
        <a
          className="text-red-400"
          href="https://www.linkedin.com/in/gabriel-souza-web/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Souzzagabe
        </a>{" "}
        2024 - All rights reserved
      </p>{" "}
    </div>
  );
};

export default Footer;
