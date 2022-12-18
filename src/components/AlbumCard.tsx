import { useGetAlbumsQuery } from "../redux/services/lastFmApi";
import { Error, Loader } from "../components";
import { useNavigate } from "react-router-dom";

interface Props {
  album: any;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  const navigate = useNavigate();

  const { isFetching, error } = useGetAlbumsQuery("");

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
        <div className="relative w-full h-56 group">
          <div
            className={`absolute inset-0 justify-center items-center bg-opacity-50 group-hover hover:bg-[#7e9486]`}
          ></div>
          <img
            alt="song_img"
            src={album.image[2]["#text"]}
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <p
            className="font-semibold text-lg text-white truncate"
            onClick={() => {
              navigate(`/songs`, { state: { album: album } });
            }}
          >
            {album.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
