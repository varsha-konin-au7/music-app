import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useGetAlbumsQuery } from "../redux/services/lastFmApi";
import { Error, Loader } from "../components";
import SearchBar from "./SearchBar";
import { BASE_URL,NO_DURATION,NO_PUBLISH_YEAR,NO_TRACK,NO_WIKI,ARTIST_NAME,LASTFM_API_KEY } from "../constants/constants";


type Album = {
  name: string;
  playcount: number;
  image: Array<{
    "#text": string;
  }>;
};


function AlbumSong(): JSX.Element {
  const location = useLocation();
  const album: Album = location.state.album;

  const [albumSongs, setAlbumSongs] = useState<any>();
  const { isFetching, error } = useGetAlbumsQuery("");

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/?method=album.getinfo&api_key=${LASTFM_API_KEY}&artist=${ARTIST_NAME}&album=${album.name}&format=json`
      )
      .then((res) => {
        setAlbumSongs(res?.data.album);
        
      })
      .catch((err) => {
        console.error(err);
      });
  }, [album.name]);

  const songsForAlbums = albumSongs?.tracks?.track;

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <SearchBar />
      <div className="relative w-full flex flex-col">
        <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
        <div className="absolute inset-0 flex items-center">
          <img
            alt="profile"
            src={album.image[2]["#text"]}
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          />

          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">
              {location.state.album.name}
            </p>
            <p className="text-gray-400 text-base my-1">
              {albumSongs?.wiki?.published ?? (
                <p className="text-gray-400 text-base my-1">
                  {NO_PUBLISH_YEAR}
                </p>
              )}
            </p>
          </div>
        </div>

        <div className="w-full sm:h-24 h-24" />
      </div>

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Wiki</h2>
        <p className="text-base text-gray-400 mt-2">
          {`Listeners: ${Math.floor(location.state.album.playcount / 1000)}k`}
        </p>
        <div className="mt-5">
          {
            <p className="text-gray-400 text-base my-1">
              {albumSongs?.wiki?.summary ?? (
                <p className="text-gray-400 text-base my-1">
                 {NO_WIKI}
                </p>
              )}
            </p>
          }
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl text-white">Songs</h1>
        {songsForAlbums?.map((track: any) => (
          <div
          key={track?.mbid}
            className={`w-full flex flex-row items-center hover:bg-[#637569] : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}
          >
            <div className=" flex-2 flex flex-row justify-left  items-center">
              <img
                className="w-20 h-20 rounded-lg"
                src={albumSongs?.image[0]["#text"]}
                alt="song_img"
              />
            </div>
            <div className="flex-1 flex flex-col justify-left mx-3">
              <p className="font-bold text-1xl text-white">
                (
                {track?.name ?? (
                  <p className="text-gray-400 text-base my-1">
                    {NO_TRACK}
                  </p>
                )}
                )
              </p>
              <p className="text-gray-400 text-base my-1">
                {(track?.duration / 60).toFixed(2) ?? (
                  <p className="text-gray-400 text-base my-1">
                   {NO_DURATION}
                  </p>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumSong;
