import "./ApplicationLogo.css";

interface ApplicationLogoProps {
  version: string;
}

export const ApplicationLogo: React.FC<ApplicationLogoProps> = ({
  version,
}) => {
  return (
    <span>
      <span className="application-logo polaris">Polaris</span>{" "}
      <span className="application-logo record">Record</span>{" "}
      <span className="application-version">ver {version}</span>
    </span>
  );
};
