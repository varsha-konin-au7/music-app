import React, { useEffect, useState } from "react";
import { Error, Loader} from "../components";
import { useGetAlbumsQuery } from "../redux/services/lastFmApi";
import AlbumCard from "../components/AlbumCard";

import {Searchbar }from "../components";
import { FiArrowUp } from "react-icons/fi";

type Album = {
  mbid: string;
  name: string;
  artist: {
    name: string;
  }
};

function Home() {
  const [arr, setArr] = useState<Album[]>([]);
  const [isAlbumSorted, isSetAlbumSorted] = useState(false);
  const [albumSorted, setAlbumSorted] = useState<Album[]>([]);
  const { data, isFetching, error } = useGetAlbumsQuery("");

  useEffect(() => {
    if (data) {
      let ans = data.topalbums.album;
      setArr(ans);
    }
  }, [data]);

  const handleClick = () => {
    if (isAlbumSorted) {
      setArr(arr);
    } else {
      const sorted = [...arr]?.sort((a: Album, b: Album) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
      setAlbumSorted(sorted);
    }
    isSetAlbumSorted(!isAlbumSorted);
  };

  if (isFetching) return <Loader/>;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <Searchbar />
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          {arr[0]?.artist?.name}
        </h2>
        <div className="flex flex-row justify-start items-center">
          <FiArrowUp
            aria-hidden="true"
            className="w-5 h-5 ml-1"
            onClick={() => handleClick()}
          />
        </div>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {isAlbumSorted
          ? albumSorted?.map((album: Album) => (
              <AlbumCard key={album.mbid} album={album} />
            ))
          : arr?.map((album: Album) => (
              <AlbumCard key={album.mbid} album={album} />
            ))}
      </div>
    </div>
  );
}

export default Home;
