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
  Slider,
  TextField,
  Rating,
  Pagination,
  Breadcrumbs,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {useState} from "react";
//?Mui Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableRowsIcon from "@mui/icons-material/TableRows";
import WindowSharpIcon from "@mui/icons-material/WindowSharp";
//?React Icons
import {BsFilterLeft} from "react-icons/bs";
import {MdOutlineFilterAlt} from "react-icons/md";
import {IoClose} from "react-icons/io5";

//!Data
import {BRANDS} from "@/data/brands";
import {RATINGS} from "@/data/ratings";
import {COLORS} from "@/data/colors";
import {PRODUCTS} from "@/data/products";
import {Link, useNavigate} from "react-router-dom";
//web
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {Transition} from "@headlessui/react";
import {FaHeart, FaRegHeart} from "react-icons/fa";

const ProductsTable = () => {
  //Mobile
  const navigate = useNavigate();
  const [listOrGrid, setListOrGrid] = useState<any>("list");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openFilter, setOpenFilter] = useState<any>(null);
  const [chosenFilters, setChosenFilters] = useState<any>(["64GB", "Huwaei", "Samsung", "Lenovo"]);
  const [sortValue, setSortValue] = useState("");
  const [checkedItems, setCheckedItems] = useState<any>({});
  const [checkedRatings, setCheckedRatings] = useState<any>({});
  const [numOfFilters, setNumOfFilters] = useState<any>("");

  const [sliderValue, setSliderValue] = useState([100, 1000]);

  const [formats, setFormats] = useState(() => []);
  const handleFormat = (event: any, newFormats: any) => {
    console.log(formats);
    console.log(newFormats);
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
  const handleChangeSlider = (event: any, newValue: any) => {
    setSliderValue(newValue);
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

  //Web
  const [filterOn, setFilterOn] = useState(false);
  const breadcrumbs = [
    <Link key="1" color="inherit" to="/" className="hover:underline  text-[#ABAEB3]">
      Home
    </Link>,
    <Link
      key="2"
      color="inherit"
      to="/material-ui/getting-started/installation/"
      className="hover:underline text-[#ABAEB3]">
      Technology
    </Link>,
    <Typography key="3" className=" text-[#ABAEB3]">
      Phones
    </Typography>,
  ];
  const [favorite, setFavorite] = useState(false);

  const otherCats = [
    "Computers",
    "Smart watches",
    "Mini Cameras",
    "Accessories",
    "Headphones",
    "Printers",
    "Multimedia",
    "Accessories",
  ];
  const [sort, setSort] = useState<string | null>("Recommended");
  const [selectSort, setSelectSort] = useState<string | null>("bestmatch");

  const handleSort = (event: React.MouseEvent<HTMLElement>, newSort: string | null) => {
    setSort(newSort);
  };
  const [expanded, setExpanded] = useState([true, true, true, true, true]);

  const handleAccordionChange = (index: any) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <>
      {/* Mobile */}
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
                  setSortValue("Newest");
                }}>
                Newest
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  setSortValue("Highest");
                }}>
                Highest Price
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  setSortValue("Lowest");
                }}>
                Lowest Price
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
          <div className="p-5">
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
                  {BRANDS.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          checked={checkedItems[item.id] || false}
                          onChange={() => handleChange(item.id)}
                        />
                      }
                      label={item.title}
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
              <AccordionDetails className="bg-gray-100">
                <FormGroup>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={sliderValue}
                    onChange={handleChangeSlider}
                    valueLabelDisplay="auto"
                    min={100}
                    max={20000}
                    // getAriaValueText={valuetext}
                  />
                  <div className="flex gap-4">
                    <TextField
                      variant="outlined"
                      value={sliderValue[0]}
                      disabled
                      label="Min Price"
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    />
                    <TextField
                      variant="outlined"
                      value={sliderValue[1]}
                      disabled
                      label="Max Price"
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    />
                  </div>
                  {/* You can now access the checked items in the checkedItems state */}
                  <button
                    className="bg-blue-500 text-white border rounded-lg p-1     my-1"
                    onClick={() => console.log("ابقي افتكر تضيف بقي الاسعار فالفلتر بتاعك لتس جو")}>
                    Apply
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
                    {COLORS.map((i) => (
                      <ToggleButton
                        value={i.value}
                        aria-label="bold"
                        key={i.id}
                        className="rounded-3xl border ">
                        {i.value}
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
                  {RATINGS.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          checked={checkedRatings[item.id] || false}
                          onChange={() => handleChangeRatings(item.id)}
                        />
                      }
                      label={item.title}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
        {PRODUCTS.map((i) => (
          <div
            className="flex gap-3  p-4 border  rounded-xl mt-2 bg-white"
            key={i.id}
            onClick={() => {
              navigate(`/product/${i.category}/${i.id}`, {state: {product: i}});
            }}>
            <img src={i.thumbnail} alt="" className="rounded    w-1/2" />
            <div className=" w-1/2 flex flex-col justify-evenly  ">
              <p className="text-neutral-600 text-base font-normal">{i.title}</p>
              <p className="text-zinc-800 text-base font-semibold">
                ${(i.price - i.price * (i?.discountPercentage || 0 / 100)).toFixed(2)}
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
        <div className="flex py-5">
          <Pagination
            count={3}
            variant="text"
            shape="circular"
            className={`whitespace-nowrap m-auto `}
          />
        </div>
      </Box>
      {/* Web */}
      <Box sx={{flexGrow: 1}} className="">
        {/* Main Text with BreadCrumbs */}
        <div className="bg-[#F8F9FA]">
          <div className="max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl  py-10">
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
            <p className="py-2 text-3xl font-semibold">Tech Gadgets</p>
            <p className="text-gray-500">
              Choose from over 7,900 electronics. Explore items created by our global community of
              independent designers, confident they're hand-reviewed by us.
            </p>
          </div>
        </div>
        {/* Filter Button */}
        <div className="pt-8 max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
          <button
            onClick={() => {
              setFilterOn((prevState) => !prevState);
            }}
            className="w-full border border-[#0d6efd] text-[#0d6efd] rounded py-1
          hover:text-white hover:bg-[#0d6efd] transition duration-300 ease-in-out
          lg:hidden
          ">
            Show filter
          </button>
          <div
            className={`
              ${filterOn ? "animate-in fade-in slide-in-from-top-7" : "hidden"}
              lg:hidden
              rounded-xl mt-4 
              duration-500
            `}>
            <Accordion style={{margin: 0, background: "#F8F9FA"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography sx={{fontWeight: "600"}}>Other category</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {otherCats.map((item, index) => (
                  <p
                    key={index}
                    className="text-gray-500 cursor-pointer hover:underline hover:text-blue-500 mt-1">
                    {item}
                  </p>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion style={{margin: 0, background: "#F8F9FA"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography sx={{fontWeight: "bold"}}>Brands</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {BRANDS.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          checked={checkedItems[item.id] || false}
                          onChange={() => handleChange(item.id)}
                        />
                      }
                      label={item.title}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{margin: 0, background: "#F8F9FA"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography sx={{fontWeight: "bold"}}>Prices</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                <FormGroup>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={sliderValue}
                    onChange={handleChangeSlider}
                    valueLabelDisplay="auto"
                    min={100}
                    max={20000}
                    // getAriaValueText={valuetext}
                  />
                  <div className="flex gap-4">
                    <TextField
                      variant="outlined"
                      value={sliderValue[0]}
                      disabled
                      label="Min Price"
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    />
                    <TextField
                      variant="outlined"
                      value={sliderValue[1]}
                      disabled
                      label="Max Price"
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    />
                  </div>
                  {/* You can now access the checked items in the checkedItems state */}
                  <button
                    className="bg-blue-500 text-white border rounded-lg p-1     my-1"
                    onClick={() => console.log("ابقي افتكر تضيف بقي الاسعار فالفلتر بتاعك لتس جو")}>
                    Apply
                  </button>
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{margin: 0, background: "#F8F9FA"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography sx={{fontWeight: "bold"}}>Colors</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                <FormGroup>
                  <ToggleButtonGroup
                    size="small"
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting">
                    {COLORS.map((i) => (
                      <ToggleButton
                        value={i.value}
                        aria-label="bold"
                        key={i.id}
                        className="rounded-3xl border ">
                        {i.value}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{margin: 0, background: "#F8F9FA"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography sx={{fontWeight: "bold"}}>Rating</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {RATINGS.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          checked={checkedRatings[item.id] || false}
                          onChange={() => handleChangeRatings(item.id)}
                        />
                      }
                      label={item.title}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="lg:hidden my-10 rounded-xl flex justify-between items-center">
            <ToggleButtonGroup
              value={sort}
              exclusive
              className=""
              onChange={handleSort}
              aria-label="text sort">
              <ToggleButton
                value="Recommended"
                aria-label="left aligned"
                className="hover:text-blue-500">
                Recommended
              </ToggleButton>
              <ToggleButton value="BestRated" aria-label="centered" className="hover:text-blue-500">
                Best rated
              </ToggleButton>
              <ToggleButton value="Latest" aria-label="centered" className="hover:text-blue-500">
                Latest
              </ToggleButton>
            </ToggleButtonGroup>
            <div className="flex items-center gap-2">
              <FormControl fullWidth>
                <Select
                  sx={{"&:hover": {borderColor: "blue"}}}
                  size="small"
                  value={selectSort}
                  onChange={handleChange}>
                  <MenuItem value={"bestmatch"}>Best Match</MenuItem>
                  <MenuItem value={"recommended"}>Recommended</MenuItem>
                  <MenuItem value={"highrated"}>High Rated</MenuItem>
                  <MenuItem value={"randomly"}>Randomly</MenuItem>
                </Select>
              </FormControl>
              <ToggleButtonGroup
                value={listOrGrid}
                exclusive
                onChange={(event) => {
                  //@ts-ignore
                  setListOrGrid(event.currentTarget.value);
                }}
                aria-label="text">
                <ToggleButton
                  value="grid"
                  aria-label="centered"
                  size="small"
                  sx={{height: "2.2rem"}}>
                  <WindowSharpIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="left aligned" sx={{height: "2.2rem"}}>
                  <TableRowsIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>{" "}
          </div>
        </div>
        <hr className=" lg:hidden" />
        <div className="flex   gap-4  max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
          <div
            className={`
            max-lg:hidden
                rounded-xl mt-4 
              duration-500 h-full
            `}>
            <Accordion
              expanded={expanded[0]}
              onChange={() => handleAccordionChange(0)}
              style={{margin: 0, background: "#F8F9FA"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography sx={{fontWeight: "600"}}>Other category</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {otherCats.map((item, index) => (
                  <p
                    key={index}
                    className="text-gray-500 cursor-pointer hover:underline hover:text-blue-500 mt-1">
                    {item}
                  </p>
                ))}
              </AccordionDetails>
            </Accordion>
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
                  {BRANDS.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          checked={checkedItems[item.id] || false}
                          onChange={() => handleChange(item.id)}
                        />
                      }
                      label={item.title}
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
                {" "}
                <FormGroup>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={sliderValue}
                    onChange={handleChangeSlider}
                    valueLabelDisplay="auto"
                    min={100}
                    max={20000}
                    // getAriaValueText={valuetext}
                  />
                  <div className="flex gap-4">
                    <TextField
                      variant="outlined"
                      value={sliderValue[0]}
                      disabled
                      label="Min Price"
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    />
                    <TextField
                      variant="outlined"
                      value={sliderValue[1]}
                      disabled
                      label="Max Price"
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    />
                  </div>
                  {/* You can now access the checked items in the checkedItems state */}
                  <button
                    className="bg-blue-500 text-white border rounded-lg p-1     my-1"
                    onClick={() => console.log("ابقي افتكر تضيف بقي الاسعار فالفلتر بتاعك لتس جو")}>
                    Apply
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
                <FormGroup>
                  <ToggleButtonGroup
                    size="small"
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting">
                    {COLORS.map((i) => (
                      <ToggleButton
                        value={i.value}
                        aria-label="bold"
                        key={i.id}
                        className="rounded-3xl border ">
                        {i.value}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
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
                  {RATINGS.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          checked={checkedRatings[item.id] || false}
                          onChange={() => handleChangeRatings(item.id)}
                        />
                      }
                      label={item.title}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className=" ">
            <div
              className="
                        max-lg:hidden

            my-10 rounded-xl flex justify-between items-center">
              <ToggleButtonGroup
                value={sort}
                exclusive
                className=""
                onChange={handleSort}
                aria-label="text sort">
                <ToggleButton
                  value="Recommended"
                  aria-label="left aligned"
                  className="hover:text-blue-500">
                  Recommended
                </ToggleButton>
                <ToggleButton
                  value="BestRated"
                  aria-label="centered"
                  className="hover:text-blue-500">
                  Best rated
                </ToggleButton>
                <ToggleButton value="Latest" aria-label="centered" className="hover:text-blue-500">
                  Latest
                </ToggleButton>
              </ToggleButtonGroup>
              <div className="flex items-center gap-2">
                <FormControl fullWidth>
                  <Select
                    sx={{"&:hover": {borderColor: "blue"}}}
                    size="small"
                    value={selectSort}
                    onChange={handleChange}>
                    <MenuItem value={"bestmatch"}>Best Match</MenuItem>
                    <MenuItem value={"recommended"}>Recommended</MenuItem>
                    <MenuItem value={"highrated"}>High Rated</MenuItem>
                    <MenuItem value={"randomly"}>Randomly</MenuItem>
                  </Select>
                </FormControl>
                <ToggleButtonGroup
                  value={listOrGrid}
                  exclusive
                  onChange={(event) => {
                    //@ts-ignore
                    setListOrGrid(event.currentTarget.value);
                  }}
                  aria-label="text">
                  <ToggleButton
                    value="grid"
                    aria-label="centered"
                    size="small"
                    sx={{height: "2.2rem"}}>
                    <WindowSharpIcon />
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="left aligned" sx={{height: "2.2rem"}}>
                    <TableRowsIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>{" "}
            </div>
            {PRODUCTS.map((product) => (
              <div
                className="cursor-pointer"
                key={product.id}
                onClick={() => {
                  navigate(`/product/${product.category}/${product.id}`, {state: {product}});
                }}>
                <div className="flex mt-4 gap-4">
                  <div className=" rounded-xl  basis-1/3 bg-gray-100 p-5">
                    <img className="aspect-[17/12] rounded-lg" src={product.thumbnail} alt="" />
                  </div>
                  <div className="basis-2/3 relative">
                    <span
                      className=" border p-2 absolute right-5 top-5  rounded text-blue-600 border-blue-600
                    hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out  
                    "
                      onTouchMove={() => {
                        setFavorite((fav) => !fav);
                      }}
                      onClick={() => {
                        setFavorite((fav) => !fav);
                      }}>
                      {favorite ? <FaHeart /> : <FaRegHeart />}
                    </span>
                    <p className="text-2xl">{product.title}</p>
                    <div className="flex items-center gap-2">
                      <Rating value={product.rating} readOnly />{" "}
                      <p className="  bg-[#565656] bg-opacity-60 rounded-full w-[0.3rem] h-[0.3rem]"></p>
                      <p className="text-[#B3B7BB]">{product.stock} In Stock</p>
                      <p className="  bg-[#565656] bg-opacity-60 rounded-full w-[0.3rem] h-[0.3rem]"></p>
                      <p className="text-green-600">Free shipping</p>
                    </div>

                    {product.discountPercentage ? (
                      <div className="">
                        <p className="text-[#FF4562] text-xl font-bold flex items-center  ">
                          ${" "}
                          {(
                            product.price -
                            product.price * (product.discountPercentage / 100)
                          ).toFixed(2)}
                          <span className="text-[#9DA1A7]  font-semibold line-through ml-2 text-lg ">
                            ${product.price}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-[#FF4562] text-xl font-bold flex items-center gap-4">
                        ${product.price}
                      </p>
                    )}
                    <p className="text-[#b2b3b6]">{product.description}</p>
                  </div>
                </div>
                <hr className="  my-6" />
              </div>
            ))}
            <div className="flex py-5">
              <Pagination
                count={3}
                variant="text"
                shape="circular"
                className={`whitespace-nowrap m-auto `}
              />
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProductsTable;
