import { IoStorefront } from "react-icons/io5";
import "./news-letter.css";

export const NewsLetter = () => {
  return (
    <div className="news">
      <div className="container">
        <div className="news-letter">
          <div className="logo">
            <IoStorefront className="icon" />
            <h1 className="text-base sm:text-2xl font-bold ">Home Tech</h1>
          </div>
          <div className="sub">
            <h4>Subcribe our Newsletter</h4>
            <p>Pellentesque eu nibh eget mauris congue mattis matti.</p>
          </div>
          <div className="mail-bar">
            <input type="search" placeholder="your email address" />
            <input type="button" value="Subcribe" />
          </div>
        </div>
      </div>
    </div>
  );
};
