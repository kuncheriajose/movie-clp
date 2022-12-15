import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { loadData } from "../../redux/listingReducer";
import Card from "./Card";
import Back from "../../assets/Back.png";
import Search from "../../assets/search.png";

function Listing() {
  const data = useSelector((state) => state.clp.data);
  const content = useSelector((state) => state.clp.content);
  const pageNo = useSelector((state) => state.clp.pageNo);
  const loading = useSelector((state) => state.clp.loading);
  const [enableSearch, setEnableSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const dispatch = useDispatch();
  const loadRef = useRef();
  const loadMoreContent = useIntersectionObserver(loadRef, { rootMargin: "600px" });
  const movies = searchTerm?.length > 0 ? content.filter((movie) => movie.name.toLowerCase().includes(searchTerm?.toLowerCase())) : content;

  useEffect(() => {
    dispatch(loadData());
  }, []);

  useEffect(() => {
    if (loadMoreContent && !loading && content?.length < +data["total-content-items"]) {
      dispatch(loadData(pageNo + 1));
    }
  }, [loadMoreContent]);

  const toggleSearch = () => {
    setEnableSearch(!enableSearch);
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto p-5 bg-black text-white">
        <div className="fixed top-0 left-5 right-5 z-10 py-3 bg-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-5">
              <img width="16px" src={Back} onClick={toggleSearch}/>
              {data?.title}
            </div>
            <div onClick={toggleSearch}>
              <img width="16px" src={Search} />
            </div>
          </div>
          {enableSearch && <input className="text-black p-1 my-1" type="text" value={searchTerm} placeholder="Search" autoFocus onChange={handleSearchInput} />}
        </div>
        <div className="grid grid-cols-3 tablet:grid-cols-4 desktop:grid-cols-6 gap-x-5 gap-y-8 mt-10">
          {movies?.map((movie, i) => (
            <Card key={`${movie.name}${i}`} name={movie.name} imageUrl={movie["poster-image"]} />
          ))}
        </div>
        <div className="ref" ref={loadRef}></div>
      </div>
    </>
  );
}

export default Listing;
