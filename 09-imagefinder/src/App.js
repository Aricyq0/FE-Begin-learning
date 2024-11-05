import "./App.css";
import { getImages } from "./services/api";
import { useState, useEffect } from "react";
import SearchContainer from "./components/SearchContainer/SearchContainer";
import ImageContainer from "./components/ImageContainer/ImageContainer";
import CustomPagination from "./components/CustomPagination/CustomPagination";
import { LoadingOutlined } from "@ant-design/icons";

function App() {
  const size = 24;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("image");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSize, setTotalSize] = useState(50);
  const [isImageDisplay, setIsImageDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const PageImageCounts =
    currentPage * size <= totalSize ? size : totalSize % size;

  useEffect(() => {
    const getData = async () => {
      await getImages(query, type, size, currentPage)
        .then((res) => setData(res.data.hits))
        .catch((err) => setError(err))
        .finally(() => {
          setLoading(false);
        });
    };
    if (loading) {
      getData();
    }
  }, [loading, currentPage, size]);

  return (
    <div className="App">
      <SearchContainer
        onSearch={(q) => {
          setQuery(q);
          setLoading(true);
          setIsImageDisplay(true);
        }}
        isImageDisplay={isImageDisplay}
        onChange={(value) => setTotalSize(value)}
        defaultSize={totalSize}
        defaultType={type}
        setType={setType}
      />
      {loading ? (
        <LoadingOutlined style={{ fontSize: "30px", color: "gray" }} />
      ) : (
        <>
          <ImageContainer
            data={data.filter((item, index) => index < PageImageCounts)}
          />
        </>
      )}
      {error && <div>Error: {error.message}</div>}
      {isImageDisplay && (
        <CustomPagination
          size={size}
          totalSize={totalSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}

export default App;
