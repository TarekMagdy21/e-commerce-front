//?Mui
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  ToggleButtonGroup,
  ToggleButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Rating,
  Breadcrumbs,

  // InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
//?Mui Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableRowsIcon from "@mui/icons-material/TableRows";
import WindowSharpIcon from "@mui/icons-material/WindowSharp";
//?React Icons
//!Data
import { Link, useLocation, useNavigate } from "react-router-dom";
//web
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import {Transition} from "@headlessui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  useGetFavoriteProductsQuery,
  useGetProductsDetailsQuery,
  useGetProductsQuery,
  useToggleFavoriteMutation,
} from "@/store/apis/productApi/productApi";
import { ProductProps } from "@/types/Product.interface";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import TablePage from "@/components/shared/TablePage";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface ProductDetailsMobileProps {
  CategoriesFilter: any;
  breadcrumbs: any;
  currentCategory: string;
}
const ProductsTableWeb: React.FC<ProductDetailsMobileProps> = ({
  CategoriesFilter,
  breadcrumbs,
  currentCategory,
}) => {
  const userId = localStorage.getItem("userId");
  const { pathname } = useLocation();
  const { data: ProductsDetails, isLoading: ProductDetailLoading } =
    useGetProductsDetailsQuery({
      category:
        pathname.split("/products")[1] !== ""
          ? pathname.split("products/")[1]
          : "all",
    });
  const { data: wishlist } = useGetFavoriteProductsQuery({ userId });
  const [addToWishlist] = useToggleFavoriteMutation({});
  const navigate = useNavigate();
  //Filtering
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [category, setCategory] = useState(
    pathname.split("products/")[1] || ""
  );
  useEffect(() => {
    setCategory(currentCategory);
  }, [currentCategory]);
  const [minimumPrice, setMinimumPrice] = useState(100);
  const [maximumPrice, setMaximumPrice] = useState(20000);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [checked, setChecked] = useState(() =>
    ProductsDetails?.brands.map((brand: any) => ({ brand, isChecked: false }))
  );

  const [checked1, setChecked1] = useState(() =>
    ProductsDetails?.ratings.map((rating: any) => ({
      rating,
      isChecked: false,
    }))
  );

  const [filterOn, setFilterOn] = useState(false);

  const [sort, setSort] = useState<string | null>("");
  const [listGrid, setListGrid] = useState<string | null>("list");
  const [expanded, setExpanded] = useState([true, true, true, true, true]);
  const checkedHandler =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      // Create a new array with the updated checkbox state at the specified index
      const updatedCheckboxes = [...checked];
      updatedCheckboxes[index] = {
        ...checked[index], // Preserve the existing properties
        isChecked: event.target.checked, // Update the isChecked property
      };

      setChecked(updatedCheckboxes);
    };
  const checkRatingHandler =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      // Create a new array with the updated checkbox state at the specified index
      const updatedCheckboxes = [...checked1];
      updatedCheckboxes[index] = {
        ...checked1[index], // Preserve the existing properties
        isChecked: event.target.checked, // Update the isChecked property
      };

      setChecked1(updatedCheckboxes);
    };

  const handleAccordionChange = (index: any) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  // Fetch products based on the current state of page, rowsPerPage, sortBy
  const {
    data: Products,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page,
    limit: rowsPerPage,
    ...(category && { category }),
    ...(brands && { brand: brands }),
    ...(colors && { color: colors }),
    ...(minPrice !== undefined && { minPrice }),
    ...(maxPrice !== undefined && { maxPrice }),
    ...(ratings && { rating: ratings }),
    ...(sort && { sort }),
  });
  // console.log('Products',Products?.products)
  useEffect(() => {
    setChecked(
      ProductsDetails?.brands.map((brand: any) => ({
        brand,
        isChecked: false,
      }))
    );
  }, [ProductsDetails?.brands, category]);
  useEffect(() => {
    setBrands(
      checked
        ?.filter((item: any) => item.isChecked)
        .map((item: any) => item.brand)
    );
  }, [checked]);
  useEffect(() => {
    setChecked1(
      ProductsDetails?.ratings.map((rating: any) => ({
        rating,
        isChecked: false,
      }))
    );
  }, [ProductsDetails?.ratings, category]);
  useEffect(() => {
    if (checked1) {
      setRatings(
        checked1
          .filter((item: any) => item.isChecked)
          .map((item: any) => item.rating)
      );
    }
  }, [checked1]);
  //Loading
  if (isLoading || ProductDetailLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {/* //! Web  bbbbbbbbbbbbbbbbbbbbbbbbbb*/}
      <Box sx={{ flexGrow: 1 }} className="">
        {/* Main Text with BreadCrumbs */}
        <div className="bg-[#F8F9FA]">
          <div className="max-w-2xl py-10 mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl ">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
            <p className="py-2 text-3xl font-semibold">Tech Gadgets</p>
            <p className="text-gray-500">
              Choose from over 7,900 electronics. Explore items created by our
              global community of independent designers, confident they're
              hand-reviewed by us.
            </p>
          </div>
        </div>
        {/* Filter Button */}
        {/* Here is the place where i show filter in size from 768px to 1024px */}
        <div className="max-w-2xl pt-8 mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
          <button
            onClick={() => {
              setFilterOn((prevState) => !prevState);
            }}
            className="w-full border border-[#0d6efd] text-[#0d6efd] rounded py-1
          hover:text-white hover:bg-[#0d6efd] transition duration-300 ease-in-out
          lg:hidden
          "
          >
            Show filter
          </button>
          <div
            className={`
              ${filterOn ? "animate-in fade-in slide-in-from-top-7" : "hidden"}
              lg:hidden
              rounded-xl mt-4 
              duration-500
            `}
          >
            <Accordion style={{ margin: 0, background: "#F8F9FA" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "600" }}>
                  Other category
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {CategoriesFilter.map((item: string, index: number) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCategory(item);
                      setChecked([false, false]);
                    }}
                  >
                    <Link
                      to={`/products/${item.replace(/\s/g, "")}`}
                      className="mt-1 text-gray-500 cursor-pointer hover:underline hover:text-blue-500"
                    >
                      {item}
                    </Link>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ margin: 0, background: "#F8F9FA" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "bold" }}>Brands</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {checked?.length > 0 &&
                    checked?.map((check: any, index: any) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            key={index}
                            checked={check?.isChecked}
                            onChange={checkedHandler(index)}
                            inputProps={{
                              "aria-label": `controlled-checkbox-${index}`,
                            }}
                          />
                        }
                        label={check?.brand}
                      />
                    ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ margin: 0, background: "#F8F9FA" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "bold" }}>Prices</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                <FormGroup>
                  <div className="flex justify-center gap-4 mb-2">
                    <TextField
                      className="w-full"
                      label="Min Price"
                      type="number"
                      value={minimumPrice}
                      inputProps={{ min: 0 }}
                      onChange={(event) => {
                        if (
                          event.target.value == "" &&
                          Number.isNaN(minimumPrice)
                        ) {
                          setMinimumPrice(0);
                        } else {
                          setMinimumPrice(parseInt(event.target.value));
                        }
                      }}
                    />
                    <TextField
                      className="w-full"
                      label="Max Price"
                      type="number"
                      value={maximumPrice}
                      inputProps={{ min: 0 }}
                      onChange={(event) => {
                        if (
                          event.target.value == "" &&
                          Number.isNaN(maximumPrice)
                        ) {
                          setMaximumPrice(0);
                        } else {
                          setMaximumPrice(parseInt(event.target.value));
                        }
                      }}
                    />
                  </div>
                  {/* You can now access the checked items in the checkedItems state */}
                  <button
                    disabled={maximumPrice < minimumPrice}
                    className={`bg-blue-500 text-white border rounded-lg p-1  my-1 ${
                      (maximumPrice == 0 && minimumPrice == 0) ||
                      maximumPrice < minimumPrice
                        ? "bg-red-500"
                        : ""
                    }`}
                    onClick={() => {
                      setMinPrice(minimumPrice);
                      setMaxPrice(maximumPrice);
                    }}
                  >
                    {(maximumPrice == 0 && minimumPrice == 0) ||
                    maximumPrice < minimumPrice
                      ? "Max price muse be less than min price"
                      : "Apply"}
                  </button>
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ margin: 0, background: "#F8F9FA" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "bold" }}>Colors</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                <FormGroup className="">
                  <ToggleButtonGroup
                    value={colors}
                    onChange={(e, value) => {
                      console.log(e);
                      setColors(value);
                    }}
                    aria-label=""
                  >
                    {ProductsDetails.colors.map((i: any, index: number) => (
                      <ToggleButton
                        value={i}
                        aria-label="bold"
                        key={index}
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        <p>{i}</p>
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ margin: 0, background: "#F8F9FA" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "bold" }}>Rating</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {checked1?.length > 0 &&
                    checked1?.map((check: any, index: any) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            key={index}
                            checked={check?.isChecked}
                            onChange={checkRatingHandler(index)}
                            inputProps={{
                              "aria-label": `controlled-checkbox-${index}`,
                            }}
                          />
                        }
                        label={<Rating value={check.rating} readOnly />}
                      />
                    ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="flex items-center justify-between my-10 lg:hidden rounded-xl">
            <ToggleButtonGroup
              value={sort}
              exclusive
              className=""
              onChange={(event, newSort) => {
                console.log(event);

                setSort(newSort);
              }}
              aria-label="text sort"
            >
              <ToggleButton
                value="BestRated"
                aria-label="centered"
                className="hover:text-blue-500"
              >
                Best rated
              </ToggleButton>
              <ToggleButton
                value="Latest"
                aria-label="centered"
                className="hover:text-blue-500"
              >
                Latest
              </ToggleButton>
            </ToggleButtonGroup>
            <div className="flex items-center gap-2">
              <ToggleButtonGroup
                value={listGrid}
                exclusive
                onChange={(event, newSort) => {
                  console.log(event);
                  setListGrid(newSort);
                }}
                aria-label="text"
              >
                <ToggleButton
                  value="grid"
                  aria-label="centered"
                  size="small"
                  sx={{ height: "2.2rem" }}
                >
                  <WindowSharpIcon />
                </ToggleButton>
                <ToggleButton
                  value="list"
                  aria-label="left aligned"
                  sx={{ height: "2.2rem" }}
                >
                  <TableRowsIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>{" "}
          </div>
        </div>
        <hr className=" lg:hidden" />
        <div className="max-w-2xl gap-4 mx-auto xl:grid xl:grid-cols-3 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
          {/* Accordions */}
          <div
            className={` col-span-1
            max-lg:hidden
             mt-4
             w-fit
              
            `}
          >
            <Accordion
              expanded={expanded[0]}
              onChange={() => handleAccordionChange(0)}
              style={{ margin: 0, background: "#F8F9FA" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "600" }}>
                  Other category
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {CategoriesFilter.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="mt-1 "
                    onClick={() => {
                      setCategory(item.replace(/\s/g, ""));
                    }}
                  >
                    <Link
                      to={`/products/${item.replace(/\s/g, "")}`}
                      key={index}
                      className="mt-1 text-gray-500 cursor-pointer hover:underline hover:text-blue-500"
                    >
                      {item}
                    </Link>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded[1]}
              onChange={() => handleAccordionChange(1)}
              style={{ margin: 0, background: "#F8F9FA" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "bold" }}>Brands</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {checked?.length > 0 &&
                    checked?.map((check: any, index: any) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            key={index}
                            checked={check?.isChecked}
                            onChange={checkedHandler(index)}
                            inputProps={{
                              "aria-label": `controlled-checkbox-${index}`,
                            }}
                          />
                        }
                        label={check?.brand}
                      />
                    ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded[2]}
              onChange={() => handleAccordionChange(2)}
              style={{ margin: 0, background: "#F8F9FA" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "bold" }}>Prices</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  <div className="flex gap-4">
                    <TextField
                      className="w-full"
                      label="Min Price"
                      type="number"
                      value={minimumPrice}
                      inputProps={{ min: 0 }}
                      onChange={(event) => {
                        if (
                          event.target.value == "" &&
                          Number.isNaN(minimumPrice)
                        ) {
                          setMinimumPrice(0);
                        } else {
                          setMinimumPrice(parseInt(event.target.value));
                        }
                      }}
                    />
                    <TextField
                      className="w-full"
                      label="Max Price"
                      type="number"
                      value={maximumPrice}
                      inputProps={{ min: 0 }}
                      onChange={(event) => {
                        if (
                          event.target.value == "" &&
                          Number.isNaN(maximumPrice)
                        ) {
                          setMaximumPrice(0);
                        } else {
                          setMaximumPrice(parseInt(event.target.value));
                        }
                      }}
                    />
                  </div>
                  {/* You can now access the checked items in the checkedItems state */}
                  <button
                    disabled={maximumPrice < minimumPrice}
                    className={`bg-blue-500 text-white border rounded-lg p-1  my-1 ${
                      (maximumPrice == 0 && minimumPrice == 0) ||
                      maximumPrice < minimumPrice
                        ? "bg-red-500"
                        : ""
                    }`}
                    onClick={() => {
                      setMinPrice(minimumPrice);
                      setMaxPrice(maximumPrice);
                    }}
                  >
                    {(maximumPrice == 0 && minimumPrice == 0) ||
                    maximumPrice < minimumPrice
                      ? "Max price muse be less than min price"
                      : "Apply"}
                  </button>
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded[3]}
              onChange={() => handleAccordionChange(3)}
              style={{ margin: 0, background: "#F8F9FA" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "bold" }}>Colors</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                <FormGroup className="">
                  <ToggleGroup
                    type="multiple"
                    className="grid grid-cols-3 gap-2"
                    onValueChange={(colors: any) => {
                      if (colors) setColors(colors);
                    }}
                  >
                    {ProductsDetails?.colors.map((item: any, index: number) => (
                      <ToggleGroupItem
                        key={index}
                        value={item}
                        className="whitespace-nowrap "
                      >
                        {item}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded[4]}
              onChange={() => handleAccordionChange(4)}
              style={{ margin: 0, background: "#F8F9FA" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "bold" }}>Rating</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {checked1?.length > 0 &&
                    checked1
                      .sort((a: any, b: any) => b.rating - a.rating)
                      .map((check: any, index: any) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              key={index}
                              checked={check?.isChecked}
                              onChange={checkRatingHandler(index)}
                              inputProps={{
                                "aria-label": `controlled-checkbox-${index}`,
                              }}
                            />
                          }
                          label={<Rating value={check.rating} readOnly />}
                        />
                      ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Mapped Products */}
          <div className="col-span-2 ">
            <div className="flex items-center justify-between my-10 max-lg:hidden rounded-xl">
              <ToggleButtonGroup
                value={sort}
                exclusive
                className=""
                onChange={(event, newSort) => {
                  console.log(event);

                  setSort(newSort);
                }}
                aria-label="text sort"
              >
                <ToggleButton
                  value="bestrated"
                  aria-label="centered"
                  className="hover:text-blue-500"
                >
                  Best rated
                </ToggleButton>
                <ToggleButton
                  value="latest"
                  aria-label="centered"
                  className="hover:text-blue-500"
                >
                  Latest
                </ToggleButton>
              </ToggleButtonGroup>
              <div className="flex items-center gap-2">
                <ToggleButtonGroup
                  value={listGrid}
                  exclusive
                  onChange={(event, newSort) => {
                    console.log(event);

                    //@ts-ignore
                    setListGrid(newSort);
                  }}
                  aria-label="text"
                >
                  <ToggleButton
                    value="grid"
                    aria-label="centered"
                    size="small"
                    sx={{ height: "2.2rem" }}
                  >
                    <WindowSharpIcon />
                  </ToggleButton>
                  <ToggleButton
                    value="list"
                    aria-label="left aligned"
                    sx={{ height: "2.2rem" }}
                  >
                    <TableRowsIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>{" "}
            </div>
            {isFetching ? (
              <div className="my-10 text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div>
                {listGrid === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {Products?.products?.map((product: ProductProps) => (
                      <div
                        className={`flex flex-col rounded overflow-hidden shadow-lg hover:shadow-xl hover:scale-110 transition duration-500`}
                        key={product._id}
                      >
                        <div key={product._id}>
                          <div>
                            <div
                              className="relative flex flex-column"
                              onClick={() => {
                                navigate(
                                  `/product/${product.category}/${product._id}`,
                                  {
                                    state: { product: product },
                                  }
                                );
                              }}
                            >
                              <img
                                className="object-fill w-full h-48 "
                                src={product.images[0]}
                                loading="lazy"
                                alt={""}
                              />
                            </div>
                            <div className="flex flex-col p-6 border-t">
                              <div
                                className="hover:text-[#0D6EFD] cursor-pointer truncate  "
                                onClick={() => {
                                  navigate(
                                    `/product/${product.category}/${product._id}`,
                                    {
                                      state: { product },
                                    }
                                  );
                                }}
                              >
                                {product.title}
                              </div>
                              <div className="flex items-center justify-between mt-2 font-semibold">
                                <p>${product.price}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {Products?.products?.map((product: ProductProps) => (
                      <div className="cursor-pointer " key={product._id}>
                        <div className="flex gap-4 mt-4">
                          <div
                            onClick={() => {
                              navigate(
                                `/product/${product.category}/${product._id}`,
                                {
                                  state: { product },
                                }
                              );
                            }}
                            className="p-5 bg-gray-100 rounded-xl basis-1/3"
                          >
                            <img
                              className="aspect-[17/12] rounded-lg"
                              src={product.images[0]}
                              alt=""
                            />
                          </div>
                          <div className="relative basis-2/3">
                            <span
                              onClick={() => {
                                addToWishlist({
                                  userId: userId,
                                  productId: product._id,
                                });
                              }}
                              className="absolute p-2 text-blue-600 transition duration-300 ease-in-out border border-blue-600 rounded right-5 top-5 hover:bg-blue-600 hover:text-white"
                            >
                              {wishlist?.wishlist.filter(
                                (item: any) => item._id == product._id
                              ).length > 0 ? (
                                <FaHeart />
                              ) : (
                                <FaRegHeart />
                              )}
                            </span>
                            <div
                              onClick={() => {
                                navigate(
                                  `/product/${product.category}/${product._id}`,
                                  {
                                    state: { product },
                                  }
                                );
                              }}
                            >
                              <p className="text-2xl">{product.title}</p>
                              <div className="flex items-center gap-2">
                                <Rating value={product.rating} readOnly />{" "}
                                <p className="  bg-[#565656] bg-opacity-60 rounded-full w-[0.3rem] h-[0.3rem]"></p>
                                <p className="text-[#B3B7BB]">
                                  {product.stock} In Stock
                                </p>
                                <p className="  bg-[#565656] bg-opacity-60 rounded-full w-[0.3rem] h-[0.3rem]"></p>
                                <p className="text-green-600">Free shipping</p>
                              </div>
                            </div>

                            {product.discountPercentage ? (
                              <div
                                className=""
                                onClick={() => {
                                  navigate(
                                    `/product/${product.category}/${product._id}`,
                                    {
                                      state: { product },
                                    }
                                  );
                                }}
                              >
                                <p className="text-[#FF4562] text-xl font-bold flex items-center  ">
                                  ${" "}
                                  {(
                                    product.price -
                                    product.price *
                                      (product.discountPercentage / 100)
                                  ).toFixed(2)}
                                  <span className="text-[#9DA1A7]  font-semibold line-through ml-2 text-lg ">
                                    ${product.price}
                                  </span>
                                </p>
                              </div>
                            ) : (
                              <p
                                onClick={() => {
                                  navigate(
                                    `/product/${product.category}/${product._id}`,
                                    {
                                      state: { product },
                                    }
                                  );
                                }}
                                className="text-[#FF4562] text-xl font-bold flex items-center gap-4"
                              >
                                ${product.price}
                              </p>
                            )}
                            <p
                              onClick={() => {
                                navigate(
                                  `/product/${product.category}/${product._id}`,
                                  {
                                    state: { product },
                                  }
                                );
                              }}
                              className="text-[#b2b3b6]"
                            >
                              {product.description}
                            </p>
                          </div>
                        </div>
                        <hr className="my-6 " />
                      </div>
                    ))}
                  </>
                )}
                <div>
                  {Products?.products?.length > 0 ? (
                    <TablePage
                      count={Products?.totalCount || 1}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      setPage={setPage}
                      setRowsPerPage={setRowsPerPage}
                    />
                  ) : (
                    <div className="flex justify-center">
                      <TablePage
                        count={Products?.totalCount || 1}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProductsTableWeb;
