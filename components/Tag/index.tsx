import React, { useEffect, useState } from "react";

interface tagType {
  title: string;
  color: string;
}

const WEB_DEV: tagType = { title: "WEB DEV", color: "bg-slate-600" };
const JAVASCRIPT: tagType = {
  title: "JAVASCRIPT",
  color: "bg-amber-300 text-black",
};
const REACT_JS: tagType = { title: "REACT.JS", color: "bg-sky-500" };
const REACT_NATIVE: tagType = { title: "REACT NATIVE", color: "bg-sky-600" };
const NEXT_JS: tagType = { title: "NEXT.JS", color: "bg-black" };
const HTML: tagType = { title: "HTML", color: "bg-orange-600" };
const TAILWIND: tagType = { title: "TAILWIND", color: "bg-cyan-500" };
const TYPESCRIPT: tagType = { title: "TYPESCRIPT", color: "bg-sky-700" };
const FULL_STACK: tagType = { title: "FULL STACK", color: "bg-green-600" };
const SQL: tagType = { title: "SQL", color: "bg-pink-600" };
const NO_SQL: tagType = { title: "NOSQL", color: "bg-emerald-700" };
const DATA_SCTRUCTURES: tagType = {
  title: "DATA STRUCTURES",
  color: "bg-purple-600",
};
const GIT: tagType = { title: "GIT", color: "bg-orange-600" };
const TESTING: tagType = { title: "TESTING", color: "bg-green-600" };

const Tag = (props: { title: string }) => {
  const [tagColor, setTagColor] = useState({});

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
      case TAILWIND.title:
        setTagColor(TAILWIND.color);
        break;
      case TYPESCRIPT.title:
        setTagColor(TYPESCRIPT.color);
        break;
      case FULL_STACK.title:
        setTagColor(FULL_STACK.color);
        break;
      case SQL.title:
        setTagColor(SQL.color);
        break;
      case NO_SQL.title:
        setTagColor(NO_SQL.color);
        break;
      case DATA_SCTRUCTURES.title:
        setTagColor(DATA_SCTRUCTURES.color);
        break;
      case GIT.title:
        setTagColor(GIT.color);
        break;
      case TESTING.title:
        setTagColor(TESTING.color);
        break;

      default:
        setTagColor(WEB_DEV.color);
        break;
    }
  }, [props.title]);
  return (
    <div className={`p-2 ${tagColor} m-1 rounded-lg`}>{`#${props.title}`}</div>
  );
};

export default Tag;
