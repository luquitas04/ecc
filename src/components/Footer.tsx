import { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => (
  <div className="bg-blue-500 text-white p-4 text-center mt-auto">
    <div>&copy; Copyright | All Rights Reserved</div>
    <div>
      <Link
        to="https://www.linkedin.com/in/lucas-benjamin-lopez-ab911b244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
        className="hover:underline hover:font-bold opacity-85 hover:opacity-100"
      >
        Lucas Lopez
      </Link>
    </div>
  </div>
);

export default Footer;
