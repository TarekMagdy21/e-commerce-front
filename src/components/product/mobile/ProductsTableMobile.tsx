//?Mui
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Fade,
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
} from "@mui/material";
import {useEffect, useState} from "react";
//?Mui Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableRowsIcon from "@mui/icons-material/TableRows";
import WindowSharpIcon from "@mui/icons-material/WindowSharp";
//?React Icons
import {BsFilterLeft} from "react-icons/bs";
import {MdOutlineFilterAlt} from "react-icons/md";
import {IoClose} from "react-icons/io5";

import {useLocation, useNavigate} from "react-router-dom";

import {useGetProductsDetailsQuery, useGetProductsQuery} from "@/store/apis/productApi/productApi";
import {ProductProps} from "@/shared/Product.interface";
import TablePage from "@/components/shared/TablePage";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

const ProductsTableMobile = ({}) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(20000);

  const {data: ProductsDetails, isLoading: ProductDetailLoading} = useGetProductsDetailsQuery({
    category: pathname.split("/products")[1] !== "" ? pathname.split("products/")[1] : "all",
  });
  //Filtering
  const [minimumPrice, setMinimumPrice] = useState(100);
  const [maximumPrice, setMaximumPrice] = useState(20000);
  const [checked, setChecked] = useState(() =>
    ProductsDetails?.brands.map((brand: any) => ({brand, isChecked: false})),
  );

  const [checked1, setChecked1] = useState(() =>
    ProductsDetails?.ratings.map((rating: any) => ({rating, isChecked: false})),
  );

  const [expanded, setExpanded] = useState([true, true, true, true, true]);
  const checkedHandler = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // Create a new array with the updated checkbox state at the specified index
    const updatedCheckboxes = [...checked];
    updatedCheckboxes[index] = {
      ...checked[index], // Preserve the existing properties
      isChecked: event.target.checked, // Update the isChecked property
    };

    setChecked(updatedCheckboxes);
  };
  const checkRatingHandler = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  // console.log('Products',Products?.products)
  useEffect(() => {
    setChecked(
      ProductsDetails?.brands.map((brand: any) => ({
        brand,
        isChecked: false,
      })),
    );
  }, [ProductsDetails?.brands]);
  useEffect(() => {
    setBrands(checked?.filter((item: any) => item.isChecked).map((item: any) => item.brand));
  }, [checked]);
  useEffect(() => {
    setChecked1(
      ProductsDetails?.ratings.map((rating: any) => ({
        rating,
        isChecked: false,
      })),
    );
  }, [ProductsDetails?.ratings]);
  useEffect(() => {
    if (checked1) {
      setRatings(checked1.filter((item: any) => item.isChecked).map((item: any) => item.rating));
    }
  }, [checked1]);

  //Mobile
  const [listOrGrid, setListOrGrid] = useState<any>("list");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openFilter, setOpenFilter] = useState<any>(null);
  const [chosenFilters, setChosenFilters] = useState<any>([]);
  const [sortValue, setSortValue] = useState("");
  const [checkedItems, setCheckedItems] = useState<any>({});
  const [checkedRatings, setCheckedRatings] = useState<any>({});
  const [numOfFilters, setNumOfFilters] = useState<any>("");

  const [formats, setFormats] = useState(() => []);
  const handleFormat = (event: any, newFormats: any) => {
    console.log(event);
    if (formats.length < newFormats.length) {
      setNumOfFilters(+numOfFilters + 1);
      setChosenFilters(+chosenFilters.length + 1);
    } else {
      setNumOfFilters(+numOfFilters - 1);
      setChosenFilters(+chosenFilters.length - 1);
    }
    setFormats(newFormats);
  };
  const removeFilters = (item: any) => {
    setChosenFilters(chosenFilters.filter((i: any) => i !== item));
  };

  const handleChange = (itemId: any) => {
    setCheckedItems((prevCheckedItems: any) => {
      const updatedItems = {...prevCheckedItems};

      if (updatedItems[itemId]) {
        // If it's true, remove it
        setNumOfFilters(numOfFilters - 1);
        delete updatedItems[itemId];
      } else {
        // If it's false or undefined, add it
        setNumOfFilters(+numOfFilters + 1);
        updatedItems[itemId] = true;
      }

      return updatedItems;
    });
  };
  const handleChangeRatings = (itemId: any) => {
    setCheckedRatings((prevCheckedItems: any) => {
      const updatedItems = {...prevCheckedItems};

      if (updatedItems[itemId]) {
        // If it's true, remove it
        setNumOfFilters(numOfFilters - 1);
        delete updatedItems[itemId];
      } else {
        // If it's false or undefined, add it
        setNumOfFilters(+numOfFilters + 1);
        updatedItems[itemId] = true;
      }

      return updatedItems;
    });
  };

  const {
    data: Products,
    isLoading,
   } = useGetProductsQuery({
    page,
    limit: rowsPerPage,
    brand: brands,
    color: colors,
    minPrice,
    maxPrice,
    rating: ratings,
    sort: sortValue,
  });

  // Event handler for sorting

  if (isLoading || ProductDetailLoading) {
    return (
      <div className="text-center my-10 md:hidden">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
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
    );
  }
  return (
    <>
      {/* //? Mobile eeeeeeeeeeeeeeeeeeee */}
      <Box sx={{flexGrow: 1}} className="px-5 bg-gray-100 font-inter md:hidden  ">
        <div className="flex justify-center items-center gap-2 pt-3 ">
          <div>
            <Button
              className="w-full whitespace-nowrap border-zinc-200  "
              style={{
                color: "black",
                borderColor: "#a5a5a5", // Replace #a5a5a5 with the appropriate zinc color code
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "none",
              }}
              variant="outlined"
              id="fade-button"
              aria-controls={Boolean(anchorEl) ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}>
              Sort{sortValue ? `: ${sortValue}` : ""}{" "}
              {
                <div className="ml-3">
                  <BsFilterLeft size="15" />
                </div>
              }
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                setAnchorEl(null);
              }}
              TransitionComponent={Fade}>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  setSortValue("bestrated");
                }}>
                Best Rated
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  setSortValue("latest");
                }}>
                Latest
              </MenuItem>
            </Menu>
          </div>
          <div>
            <Button
              style={{
                textTransform: "none",
                color: "black",
                borderColor: "#a5a5a5", // Replace #a5a5a5 with the appropriate zinc color code
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
              className="w-full"
              variant="outlined"
              onClick={() => {
                setOpenFilter((openFilter: boolean) => !openFilter);
              }}>
              Filter{numOfFilters > 0 ? `(${numOfFilters})` : ""}{" "}
              {
                <div className="ml-3">
                  <MdOutlineFilterAlt size="15" />
                </div>
              }
            </Button>
          </div>
          <div>
            <ToggleButtonGroup
              value={listOrGrid}
              exclusive
              onChange={(event) => {
                //@ts-ignore
                setListOrGrid(event.currentTarget.value);
              }}
              aria-label="text">
              <ToggleButton value="grid" aria-label="centered" size="small" sx={{height: "2.2rem"}}>
                <WindowSharpIcon />
              </ToggleButton>
              <ToggleButton
                value="list"
                aria-label="left aligned"
                size="small"
                sx={{height: "2.2rem"}}>
                <TableRowsIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        {chosenFilters.length > 0 && (
          <div className="flex overflow-x-auto whitespace-nowrap gap-4 scrollbar-none px-5">
            {chosenFilters.map((i: any, index: any) => (
              <div
                className="border-2 border-blue-500 rounded px-2 flex items-center gap-2  mt-2"
                key={index}>
                {i}
                <span
                  onClick={() => {
                    removeFilters(i);
                  }}>
                  <IoClose />
                </span>
              </div>
            ))}
          </div>
        )}
        {openFilter && (
          <>
            <div className="p-5 hidden">
              {/* Brands */}
              <Accordion>
                <AccordionSummary
                  style={{backgroundColor: "#f3f4f6 "}}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>Brands</Typography>
                </AccordionSummary>
                <AccordionDetails className="bg-gray-100">
                  <FormGroup>
                    {ProductsDetails.brands.map((item: any) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            checked={checkedItems[item] || false}
                            onChange={() => handleChange(item)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
              {/* Prices */}
              <Accordion>
                <AccordionSummary
                  style={{backgroundColor: "#f3f4f6 "}}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>Prices</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    <div className="flex gap-4">
                      <TextField
                        className="w-full"
                        label="Min Price"
                        type="number"
                        value={minimumPrice}
                        inputProps={{min: 0}}
                        onChange={(event) => {
                          if (event.target.value == "" && Number.isNaN(minimumPrice)) {
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
                        inputProps={{min: 0}}
                        onChange={(event) => {
                          if (event.target.value == "" && Number.isNaN(maximumPrice)) {
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
                        (maximumPrice == 0 && minimumPrice == 0) || maximumPrice < minimumPrice
                          ? "bg-red-500"
                          : ""
                      }`}
                      onClick={() => {
                        setMinPrice(minimumPrice);
                        setMaxPrice(maximumPrice);
                      }}>
                      {(maximumPrice == 0 && minimumPrice == 0) || maximumPrice < minimumPrice
                        ? "Max price muse be less than min price"
                        : "Apply"}
                    </button>
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
              {/* Colors */}
              <Accordion>
                <AccordionSummary
                  style={{backgroundColor: "#f3f4f6 "}}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>Colors</Typography>
                </AccordionSummary>
                <AccordionDetails className="bg-gray-100">
                  <FormGroup>
                    <ToggleButtonGroup
                      size="small"
                      value={formats}
                      onChange={handleFormat}
                      aria-label="text formatting">
                      {ProductsDetails?.colors.map((i: any) => (
                        <ToggleButton
                          value={i}
                          aria-label="bold"
                          key={i}
                          className="rounded-3xl border ">
                          {i}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
              {/* Ratings */}
              <Accordion>
                <AccordionSummary
                  style={{backgroundColor: "#f3f4f6 "}}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>Rating</Typography>
                </AccordionSummary>
                <AccordionDetails className="bg-gray-100">
                  <FormGroup>
                    {ProductsDetails.ratings.map((item: any) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            checked={checkedRatings[item] || false}
                            onChange={() => handleChangeRatings(item)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </div>
            {/* Accordions */}
            <div
              className={`
             mt-4
             w-fit
            `}>
              <Accordion
                expanded={expanded[1]}
                onChange={() => handleAccordionChange(1)}
                style={{margin: 0, background: "#F8F9FA"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography sx={{fontWeight: "bold"}}>Brands</Typography>
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
                              inputProps={{"aria-label": `controlled-checkbox-${index}`}}
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
                style={{margin: 0, background: "#F8F9FA"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography sx={{fontWeight: "bold"}}>Prices</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    <div className="flex gap-4">
                      <TextField
                        className="w-full"
                        label="Min Price"
                        type="number"
                        value={minimumPrice}
                        inputProps={{min: 0}}
                        onChange={(event) => {
                          if (event.target.value == "" && Number.isNaN(minimumPrice)) {
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
                        inputProps={{min: 0}}
                        onChange={(event) => {
                          if (event.target.value == "" && Number.isNaN(maximumPrice)) {
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
                        (maximumPrice == 0 && minimumPrice == 0) || maximumPrice < minimumPrice
                          ? "bg-red-500"
                          : ""
                      }`}
                      onClick={() => {
                        setMinPrice(minimumPrice);
                        setMaxPrice(maximumPrice);
                      }}>
                      {(maximumPrice == 0 && minimumPrice == 0) || maximumPrice < minimumPrice
                        ? "Max price muse be less than min price"
                        : "Apply"}
                    </button>
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded[3]}
                onChange={() => handleAccordionChange(3)}
                style={{margin: 0, background: "#F8F9FA"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography sx={{fontWeight: "bold"}}>Colors</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {" "}
                  <FormGroup className=" ">
                    <ToggleGroup
                      type="multiple"
                      className="grid grid-cols-3 gap-2"
                      onValueChange={(colors: any) => {
                        if (colors) setColors(colors);
                      }}>
                      {ProductsDetails?.colors.map((item: any, index: number) => (
                        <ToggleGroupItem key={index} value={item} className="whitespace-nowrap  ">
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
                style={{margin: 0, background: "#F8F9FA"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography sx={{fontWeight: "bold"}}>Rating</Typography>
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
                                inputProps={{"aria-label": `controlled-checkbox-${index}`}}
                              />
                            }
                            label={<Rating value={check.rating} readOnly />}
                          />
                        ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </div>
          </>
        )}
        {Products.products.map((i: ProductProps) => (
          <div
            className="flex gap-3  p-4 border  rounded-xl mt-2 bg-white"
            key={i._id}
            onClick={() => {
              navigate(`/product/${i.category}/${i._id}`, {state: {product: i}});
            }}>
            <img src={i.images[0]} alt="" className="rounded    w-40 h-40" />
            <div className=" w-1/2 flex flex-col justify-evenly  ">
              <p className="text-neutral-600 text-base font-normal">{i.title}</p>
              <p className="text-zinc-800 text-base font-semibold">
                $
                {i?.discountPercentage
                  ? (i.price - i.price * (i.discountPercentage / 100)).toFixed(2)
                  : i.price.toFixed(2)}
              </p>
              <div className=" flex flex-col ">
                <Rating name="read-only" value={i.rating} readOnly />{" "}
                <span className="whitespace-nowrap text-gray-400 text-sm font-normal">
                  {i.stock} In Stock
                </span>
              </div>
              <p className="text-green-600">Free Shipping</p>
            </div>
          </div>
        ))}
        <div className="flex   ">
          {Products?.products?.length > 0 ? (
            <TablePage
              count={Products?.totalCount || 1}
              page={page}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
            />
          ) : (
            <div className="justify-center flex">
              <p className="flex flex-col text-center">
                No Products Found
                <span> Please check your filters</span>{" "}
              </p>
            </div>
          )}
        </div>
      </Box>
    </>
  );
};

export default ProductsTableMobile;
