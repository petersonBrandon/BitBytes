import React, { useEffect, useState } from "react";

const WEB_DEV = { title: "WEB DEV", color: "bg-slate-600" };
const JAVASCRIPT = { title: "JAVASCRIPT", color: "bg-amber-300 text-black" };
const REACT_JS = { title: "REACT.JS", color: "bg-sky-500" };
const REACT_NATIVE = { title: "REACT NATIVE", color: "bg-sky-600" };
const NEXT_JS = { title: "NEXT.JS", color: "bg-black" };
const HTML = { title: "HTML", color: "bg-orange-600" };

const Tag = (props) => {
  const [tagColor, setTagColor] = useState();

  useEffect(() => {
    switch (props.title.toUpperCase()) {
      case WEB_DEV.title:
        setTagColor(WEB_DEV.color);
        break;
      case JAVASCRIPT.title:
        setTagColor(JAVASCRIPT.color);
        break;
      case REACT_JS.title:
        setTagColor(REACT_JS.color);
        break;
      case REACT_NATIVE.title:
        setTagColor(REACT_NATIVE.color);
        break;
      case NEXT_JS.title:
        setTagColor(NEXT_JS.color);
        break;
      case HTML.title:
        setTagColor(HTML.color);
        break;

      default:
        setTagColor(WEB_DEV.color);
        break;
    }
  }, [props.title]);
  return <div className={`p-2 ${tagColor} m-1 rounded-lg `}>{props.title}</div>;
};

export default Tag;
