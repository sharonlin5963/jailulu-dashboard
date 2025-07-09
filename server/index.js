import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, useLoaderData, useNavigate, NavLink, redirect, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Backdrop, CircularProgress, Snackbar, Alert, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, SvgIcon, IconButton, AppBar, Toolbar, Box, Drawer, Card, CardContent, CardActionArea, Chip, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Checkbox } from "@mui/material";
import { BedroomParent, Add, Image, HomeOutlined, GroupOutlined, CategoryOutlined, Face, Logout, Menu, ArrowDownwardOutlined, ArrowUpwardOutlined, EditNote } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import dayjs from "dayjs";
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, getDocs, collection, updateDoc, doc, Timestamp, addDoc, getDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { twMerge } from "tailwind-merge";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const theme = createTheme({
  palette: {
    text: { primary: "#1f1f36" },
    primary: {
      main: "#91C4BC",
      light: "#E1F0ED",
      dark: "#4A857D",
      contrastText: "#ffffff"
    },
    warning: {
      main: "#F78748",
      contrastText: "#ffffff"
    },
    success: {
      main: "#12b76a",
      light: "#ecfdf3",
      dark: "#027a48"
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 6px 0px rgba(13, 10, 44, 0.08)",
          borderRadius: "20px"
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 6px 0px rgba(13, 10, 44, 0.08)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderWidth: 2
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px"
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          justifyContent: "center",
          paddingBottom: "24px"
        }
      }
    }
  }
});
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "zh-TW",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("title", {
        children: "Jailulu 後台管理系統"
      }), /* @__PURE__ */ jsx("meta", {
        property: "og:title",
        content: "Jailulu後台管理系統"
      }), /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "Jailulu後台管理系統-商品與會員管理平台"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsx("body", {
      children: /* @__PURE__ */ jsxs(ThemeProvider, {
        theme,
        children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
      })
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const BaseTable = ({
  columns: columns2,
  rows,
  maxHeight = 500,
  stickyHeader = false,
  hover = true
}) => {
  return /* @__PURE__ */ jsx(Paper, { children: /* @__PURE__ */ jsx(TableContainer, { sx: { maxHeight }, children: /* @__PURE__ */ jsxs(Table, { stickyHeader, children: [
    /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx(TableRow, { children: columns2.map((column) => /* @__PURE__ */ jsx(
      TableCell,
      {
        align: column.align,
        style: { minWidth: column.minWidth },
        children: column.label
      },
      column.id
    )) }) }),
    /* @__PURE__ */ jsx(TableBody, { children: rows.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: columns2.length, align: "center", children: "查無資料" }) }) : rows.map((row) => {
      return /* @__PURE__ */ jsx(TableRow, { hover, children: columns2.map((column) => {
        const value = row[column.id];
        return /* @__PURE__ */ jsx(TableCell, { align: column.align, children: column.format ? column.format(value, row) : value }, column.id);
      }) }, row.id);
    }) })
  ] }) }) });
};
const Loading = ({ open }) => {
  return /* @__PURE__ */ jsx(
    Backdrop,
    {
      sx: (theme2) => ({ color: "#fff", zIndex: theme2.zIndex.drawer + 1 }),
      open,
      children: /* @__PURE__ */ jsx(CircularProgress, { color: "inherit" })
    }
  );
};
const ErrorAlert = ({
  open,
  onClose,
  message,
  severity = "error",
  anchorOrigin = { vertical: "top", horizontal: "center" }
}) => {
  return /* @__PURE__ */ jsx(
    Snackbar,
    {
      open,
      anchorOrigin,
      onClose,
      autoHideDuration: 4e3,
      children: /* @__PURE__ */ jsx(Alert, { severity, children: message })
    }
  );
};
const Logo = () => {
  return /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsx(BedroomParent, { className: "text-orange-500", sx: { fontSize: 35 } }),
    /* @__PURE__ */ jsx("img", { src: "/assets/icons/logo.svg", alt: "logo", className: "w-[120px]" })
  ] });
};
const Header = ({ title, description, ctaText, ctaUrl }) => {
  return /* @__PURE__ */ jsxs("header", { className: "flex flex-col gap-5 md:flex-row justify-between w-full", children: [
    /* @__PURE__ */ jsxs("article", { className: "flex flex-col gap-3.5 w-full", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-dark-100 text-xl md:text-2xl font-semibold", children: title }),
      description && /* @__PURE__ */ jsx("p", { className: "text-gray-100 text-sm md:text-lg", children: description })
    ] }),
    ctaText && ctaUrl && /* @__PURE__ */ jsx(Link, { to: ctaUrl, children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "contained",
        startIcon: /* @__PURE__ */ jsx(Add, {}),
        className: "whitespace-nowrap",
        children: ctaText
      }
    ) })
  ] });
};
const UploadImage = ({
  onImageSelect,
  defaultImage,
  sx = {}
}) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (defaultImage) {
      setImage(defaultImage);
    }
  }, [defaultImage]);
  const handleImageUpload = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    onImageSelect(file);
  };
  return /* @__PURE__ */ jsxs(
    Button,
    {
      component: "label",
      variant: "outlined",
      sx: {
        width: "100%",
        aspectRatio: "1 / 1",
        maxWidth: "350px",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        padding: 0,
        overflow: "hidden",
        margin: "auto",
        ...sx
      },
      children: [
        image ? /* @__PURE__ */ jsx(
          "img",
          {
            src: image,
            alt: "預覽圖片",
            className: "w-full h-full object-cover aspect-square"
          }
        ) : /* @__PURE__ */ jsxs("div", { className: "text-gray-100 flex flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsx(Image, { sx: { fontSize: 32 } }),
          /* @__PURE__ */ jsx("span", { className: "text-base font-normal", children: "上傳圖片" })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", hidden: true, onChange: handleImageUpload })
      ]
    }
  );
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const calculateTrendPercentage = (countOfThisMonth, countOfLastMonth) => {
  if (countOfLastMonth === 0) {
    return countOfThisMonth === 0 ? { trend: "no change", percentage: 0 } : { trend: "increment", percentage: 100 };
  }
  const change = countOfThisMonth - countOfLastMonth;
  const percentage = Math.abs(change / countOfLastMonth * 100);
  if (change > 0) {
    return { trend: "increment", percentage };
  } else if (change < 0) {
    return { trend: "decrement", percentage };
  } else {
    return { trend: "no change", percentage: 0 };
  }
};
const formatTWD = (num) => {
  return num.toLocaleString("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0
  });
};
function formatFirestoreTimestamp(ts) {
  return dayjs(ts.toDate()).format("YYYY-MM-DD");
}
const firebaseConfig = {
  apiKey: "AIzaSyDKUrSG2JF9fR04MRbev_qzRHVq40J55go",
  authDomain: "jailulu-store-769a0.firebaseapp.com",
  projectId: "jailulu-store-769a0",
  storageBucket: "jailulu-store-769a0.firebasestorage.app",
  messagingSenderId: "448350652423",
  appId: "1:448350652423:web:d3ca622a4e00e95bfcc2a2",
  measurementId: "G-K8W0HBV8SC"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const uploadToCloudinary = async (image) => {
  const formDataImage = new FormData();
  formDataImage.append("file", image);
  formDataImage.append("upload_preset", "jailulu_product_image_upload");
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgtaxvo7h/image/upload",
      { method: "POST", body: formDataImage }
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
const EditProfileDialog = ({ open, onClose }) => {
  const currentUser = auth.currentUser;
  const [name, setName] = useState(
    (currentUser == null ? void 0 : currentUser.displayName) || (currentUser == null ? void 0 : currentUser.email) || ""
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertState, setAlertState] = useState({ message: "" });
  useEffect(() => {
    if (open && currentUser) {
      setName(currentUser.displayName || currentUser.email || "");
      setSelectedImage(null);
    }
  }, [open]);
  const handleSave = async () => {
    if (!currentUser) {
      return;
    }
    if (!name.trim()) {
      setAlertState({ message: "名字不能為空", type: "error" });
      setAlertOpen(true);
      return;
    }
    setLoading(true);
    try {
      let photoURL = currentUser.photoURL || "";
      if (selectedImage) {
        photoURL = await uploadToCloudinary(selectedImage);
      }
      await updateProfile(currentUser, {
        displayName: name.trim(),
        photoURL
      });
      setAlertState({ message: "個人資料更新成功", type: "success" });
      setAlertOpen(true);
      onClose();
    } catch (error) {
      setAlertState({ message: "更新失敗，請稍後再試", type: "error" });
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Dialog, { open, onClose, maxWidth: "xs", fullWidth: true, children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "編輯個人資訊" }),
      /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex-center flex-col gap-6 p-4", children: [
        /* @__PURE__ */ jsx(
          UploadImage,
          {
            defaultImage: (currentUser == null ? void 0 : currentUser.photoURL) || "",
            onImageSelect: (file) => setSelectedImage(file),
            sx: { borderRadius: "100%", maxWidth: "120px" }
          }
        ),
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "暱稱 / 名字",
            value: name,
            onChange: (e) => setName(e.target.value),
            fullWidth: true,
            disabled: loading
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(DialogActions, { children: [
        /* @__PURE__ */ jsx(Button, { onClick: onClose, disabled: loading, children: "取消" }),
        /* @__PURE__ */ jsx(Button, { variant: "contained", onClick: handleSave, loading, children: "儲存" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ErrorAlert,
      {
        open: alertOpen,
        message: alertState.message,
        severity: alertState.type,
        onClose: () => setAlertOpen(false)
      }
    )
  ] });
};
const NavItems = ({ handleClick }) => {
  const sidebarItems = [
    {
      icon: HomeOutlined,
      label: "首頁",
      href: "/"
    },
    {
      icon: GroupOutlined,
      label: "用戶管理",
      href: "/all-users"
    },
    {
      icon: CategoryOutlined,
      label: "商品管理",
      href: "/products"
    }
  ];
  const user = useLoaderData();
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      navigator("/sign-in");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "flex flex-col px-6 h-full", children: [
      /* @__PURE__ */ jsx("div", { className: "pt-10", children: /* @__PURE__ */ jsx(Logo, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between flex-col h-full", children: [
        /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-3.5 pt-9", children: sidebarItems.map(({ icon, label, href }) => /* @__PURE__ */ jsx(NavLink, { to: href, children: ({ isActive }) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn("group nav-item", {
              "bg-primary-100 !text-white": isActive
            }),
            onClick: handleClick,
            children: [
              /* @__PURE__ */ jsx(SvgIcon, { component: icon }),
              label
            ]
          }
        ) }, href)) }),
        /* @__PURE__ */ jsxs("footer", { className: "flex gap-3 pb-8", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "text",
              className: "flex gap-2.5",
              onClick: () => setEditOpen(true),
              children: [
                user.photoURL ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    className: "size-10 rounded-full aspect-square",
                    src: user.photoURL,
                    alt: user.displayName
                  }
                ) : /* @__PURE__ */ jsx(Face, { className: "text-gray-100", sx: { fontSize: 40 } }),
                /* @__PURE__ */ jsxs("article", { className: "text-left flex flex-col gap-1 max-w-[115px]", children: [
                  /* @__PURE__ */ jsx("h2", { className: "p-16-semibold text-dark-200 truncate", children: (user == null ? void 0 : user.displayName) || (user == null ? void 0 : user.email) }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-100 text-xs md:text-sm font-normal truncate", children: user == null ? void 0 : user.email })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              "aria-label": "logout",
              color: "warning",
              onClick: handleLogout,
              loading: isLoading,
              children: /* @__PURE__ */ jsx(Logout, {})
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(EditProfileDialog, { open: editOpen, onClose: () => setEditOpen(false) })
  ] });
};
const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return /* @__PURE__ */ jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsx(AppBar, { component: "nav", sx: { bgcolor: "#fff", padding: "30px 8px" }, children: /* @__PURE__ */ jsxs(Toolbar, { children: [
    /* @__PURE__ */ jsx(Box, { sx: { flexGrow: 1 }, children: /* @__PURE__ */ jsx(Logo, {}) }),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        onClick: toggleDrawer(true),
        size: "large",
        edge: "end",
        "aria-label": "menu",
        children: /* @__PURE__ */ jsx(Menu, { sx: { fontSize: 35 } })
      }
    ),
    /* @__PURE__ */ jsx(Drawer, { open, onClose: toggleDrawer(false), children: /* @__PURE__ */ jsx(NavItems, { handleClick: toggleDrawer(false) }) })
  ] }) }) });
};
const StatsCard = ({
  headerTitle,
  total,
  currentMonthCount,
  lastMonthCount
}) => {
  const { trend, percentage } = calculateTrendPercentage(
    currentMonthCount,
    lastMonthCount
  );
  const isDecrement = trend === "decrement";
  return /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { children: [
    /* @__PURE__ */ jsx("h3", { className: "text-base font-medium mb-6", children: headerTitle }),
    /* @__PURE__ */ jsxs("div", { className: "flex md:flex-col-reverse xl:flex-row xl:items-center gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-semibold", children: total }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("figure", { className: "flex items-center gap-1", children: [
            isDecrement ? /* @__PURE__ */ jsx(ArrowDownwardOutlined, { color: "error" }) : /* @__PURE__ */ jsx(ArrowUpwardOutlined, { color: "success" }),
            /* @__PURE__ */ jsxs(
              "figcaption",
              {
                className: cn(
                  "text-sm font-medium",
                  isDecrement ? "text-red-100" : "text-success-500"
                ),
                children: [
                  Math.round(percentage),
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-100 truncate", children: "vs 上個月" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "grow",
          src: `/assets/icons/${isDecrement ? "decrement.svg" : "increment.svg"}`,
          alt: "trend graph"
        }
      )
    ] })
  ] }) }) });
};
const ItemCard = ({
  id,
  name,
  imageUrl,
  group,
  price,
  isSale,
  specialPrice
}) => {
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardActionArea, { component: Link, to: `/product-edit/${id}`, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: imageUrl,
        alt: name,
        className: " w-full h-[180px] rounded-t-xl object-cover aspect-square"
      }
    ),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxs("article", { className: "flex flex-col gap-3 text-sm md:text-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-dark-100 line-clamp-1", children: name }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx(
            Chip,
            {
              color: "primary",
              variant: "outlined",
              label: group,
              size: "small"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-1 font-normal", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: isSale ? "text-gray-100 line-through decoration-red-100" : "text-dark-300",
                children: formatTWD(price)
              }
            ),
            isSale && specialPrice && /* @__PURE__ */ jsx("span", { className: "text-red-100", children: formatTWD(specialPrice) })
          ] })
        ] })
      ] }),
      isSale && /* @__PURE__ */ jsx(
        Chip,
        {
          color: "error",
          label: "SALE",
          className: "absolute top-3 right-3 tracking-wider"
        }
      )
    ] })
  ] }) });
};
const ProductSearchBar = ({
  searchQuery,
  setSearchQuery,
  onSearch
}) => {
  const [groupOptions, setGroupOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const resetSearchQuery = () => {
    setSearchQuery({
      name: "",
      group: "",
      status: "",
      isSale: ""
    });
    onSearch();
  };
  const getGroupOptions = async () => {
    setLoading(true);
    try {
      const groupSnapshot = await getDocs(collection(db, "groups"));
      const groupData = groupSnapshot.docs.map((doc2) => doc2.data());
      setGroupOptions(groupData);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getGroupOptions();
  }, []);
  return /* @__PURE__ */ jsxs(Box, { className: "flex flex-wrap gap-4 items-center", children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        label: "商品名稱",
        variant: "outlined",
        value: searchQuery.name,
        onChange: (e) => setSearchQuery({ ...searchQuery, name: e.target.value })
      }
    ),
    /* @__PURE__ */ jsxs(FormControl, { sx: { minWidth: 160 }, children: [
      /* @__PURE__ */ jsx(InputLabel, { id: "group-select-label", children: "商品分類" }),
      /* @__PURE__ */ jsxs(
        Select,
        {
          labelId: "group-select-label",
          value: searchQuery.group,
          label: "商品分類",
          onChange: (e) => setSearchQuery({ ...searchQuery, group: e.target.value }),
          children: [
            /* @__PURE__ */ jsx(MenuItem, { value: "", children: "全部" }),
            groupOptions.map((group) => /* @__PURE__ */ jsx(MenuItem, { value: group.value, children: group.label }, group.value))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(FormControl, { sx: { minWidth: 120 }, children: [
      /* @__PURE__ */ jsx(InputLabel, { id: "status-select-label", children: "上下架" }),
      /* @__PURE__ */ jsxs(
        Select,
        {
          labelId: "status-select-label",
          value: searchQuery.status,
          label: "上下架",
          onChange: (e) => setSearchQuery({ ...searchQuery, status: e.target.value }),
          children: [
            /* @__PURE__ */ jsx(MenuItem, { value: "", children: "全部" }),
            /* @__PURE__ */ jsx(MenuItem, { value: "1", children: "上架" }),
            /* @__PURE__ */ jsx(MenuItem, { value: "0", children: "下架" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(FormControl, { sx: { minWidth: 120 }, children: [
      /* @__PURE__ */ jsx(InputLabel, { id: "sale-select-label", children: "商品價格" }),
      /* @__PURE__ */ jsxs(
        Select,
        {
          labelId: "sale-select-label",
          value: searchQuery.isSale,
          label: "商品價格",
          onChange: (e) => setSearchQuery({ ...searchQuery, isSale: e.target.value }),
          children: [
            /* @__PURE__ */ jsx(MenuItem, { value: "", children: "全部" }),
            /* @__PURE__ */ jsx(MenuItem, { value: "true", children: "特價" }),
            /* @__PURE__ */ jsx(MenuItem, { value: "false", children: "原價" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Button, { disabled: loading, variant: "contained", onClick: onSearch, children: "搜尋" }),
    /* @__PURE__ */ jsx(Button, { disabled: loading, variant: "outlined", onClick: resetSearchQuery, children: "清空" })
  ] });
};
const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};
const schema$1 = yup.object().shape({
  email: yup.string().email("請輸入有效的 Email").required("Email 為必填"),
  password: yup.string().min(6, "密碼至少 6 碼").required("密碼為必填")
});
async function clientLoader$1() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    return redirect("/");
  }
}
const signIn = () => {
  var _a, _b;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema$1)
  });
  const handleAuthError = (errorCode) => {
    const errorMap = {
      "auth/invalid-email": "Email 格式不正確",
      "auth/invalid-credential": "信箱或密碼錯誤"
    };
    const errMessage = errorMap[errorCode];
    if (errMessage) {
      setErrorMessage(errMessage);
    } else {
      setErrorMessage("登入失敗，請稍後再試");
    }
    setAlertOpen(true);
  };
  const onSubmit = async ({
    email,
    password
  }) => {
    setErrorMessage("");
    setAlertOpen(false);
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/index");
    } catch (error) {
      handleAuthError(error.code);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("main", {
    className: "w-full h-screen flex bg-[url(/assets/images/auth-img.png)] bg-cover bg-no-repeat bg-center",
    children: [/* @__PURE__ */ jsx("section", {
      className: "size-full bg-white/20 backdrop-filter-[blur(2px)] flex-center",
      children: /* @__PURE__ */ jsxs(Paper, {
        elevation: 3,
        sx: {
          borderRadius: "20px",
          maxWidth: {
            sm: "420px"
          },
          width: "100%"
        },
        className: "flex flex-col items-center gap-9 p-10",
        children: [/* @__PURE__ */ jsx(Logo, {}), /* @__PURE__ */ jsxs(Box, {
          component: "form",
          noValidate: true,
          className: "flex flex-col gap-4 w-full",
          children: [/* @__PURE__ */ jsx(TextField, {
            label: "Email",
            variant: "outlined",
            fullWidth: true,
            ...register("email"),
            error: !!errors.email,
            helperText: (_a = errors.email) == null ? void 0 : _a.message
          }), /* @__PURE__ */ jsx(TextField, {
            label: "密碼",
            variant: "outlined",
            type: "password",
            fullWidth: true,
            ...register("password"),
            error: !!errors.password,
            helperText: (_b = errors.password) == null ? void 0 : _b.message
          })]
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          variant: "contained",
          color: "primary",
          fullWidth: true,
          loading: isLoading,
          loadingPosition: "start",
          onClick: handleSubmit(onSubmit),
          children: "登入"
        })]
      })
    }), /* @__PURE__ */ jsx(ErrorAlert, {
      open: alertOpen,
      message: errorMessage,
      severity: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right"
      },
      onClose: () => setAlertOpen(false)
    })]
  });
};
const signIn$1 = UNSAFE_withComponentProps(signIn);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clientLoader: clientLoader$1,
  default: signIn$1
}, Symbol.toStringTag, { value: "Module" }));
async function clientLoader() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/sign-in");
  }
  return currentUser;
}
const AdminLayout = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col lg:flex-row h-screen w-full",
    children: [/* @__PURE__ */ jsx(MobileSidebar, {}), /* @__PURE__ */ jsx("aside", {
      className: "w-full max-w-[270px] hidden lg:block",
      children: /* @__PURE__ */ jsx(NavItems, {})
    }), /* @__PURE__ */ jsx("aside", {
      className: "w-full h-full overflow-auto bg-light-200 pt-40 lg:pt-10",
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
};
const adminLayout = UNSAFE_withComponentProps(AdminLayout);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clientLoader,
  default: adminLayout
}, Symbol.toStringTag, { value: "Module" }));
const dashboardStats = {
  usersJoined: {
    total: 125,
    currentMonth: 20,
    lastMonth: 10
  },
  itemsCreated: {
    total: 60,
    currentMonth: 3,
    lastMonth: 2
  },
  userRole: {
    total: 23,
    currentMonth: 10,
    lastMonth: 15
  }
};
const Dashboard = () => {
  const {
    usersJoined,
    itemsCreated,
    userRole
  } = dashboardStats;
  const [products2, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const products22 = querySnapshot.docs.map((doc2) => ({
        id: doc2.id,
        ...doc2.data()
      }));
      const filteredProducts = products22.filter((product) => product.status === 1);
      setProducts(filteredProducts.slice(0, 4));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return /* @__PURE__ */ jsxs("main", {
    className: "wrapper dashboard",
    children: [/* @__PURE__ */ jsx(Header, {
      title: "您好 👋",
      description: "提供商品管理、訂單追蹤與銷售分析功能，幫助快速更新商品資訊、查看客戶資料及掌握市場趨勢，高效提升運營效率。"
    }), /* @__PURE__ */ jsx("section", {
      className: "flex flex-col gap-6",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
        children: [/* @__PURE__ */ jsx(StatsCard, {
          headerTitle: "總商品數",
          total: itemsCreated.total,
          currentMonthCount: itemsCreated.currentMonth,
          lastMonthCount: itemsCreated.lastMonth
        }), /* @__PURE__ */ jsx(StatsCard, {
          headerTitle: "總用戶數",
          total: usersJoined.total,
          currentMonthCount: usersJoined.currentMonth,
          lastMonthCount: usersJoined.lastMonth
        }), /* @__PURE__ */ jsx(StatsCard, {
          headerTitle: "今日用戶活躍度",
          total: userRole.total,
          currentMonthCount: userRole.currentMonth,
          lastMonthCount: userRole.lastMonth
        })]
      })
    }), /* @__PURE__ */ jsxs("section", {
      className: "flex flex-col gap-5 mt-2.5",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-xl font-semibold text-dark-100",
        children: "商品列表"
      }), /* @__PURE__ */ jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7",
        children: products2.length === 0 ? /* @__PURE__ */ jsx(Link, {
          to: "/products",
          className: "col-span-full m-auto",
          children: /* @__PURE__ */ jsx(Button, {
            variant: "contained",
            children: "暫無商品，前往商品管理頁"
          })
        }) : products2.slice(0, 4).map((product) => /* @__PURE__ */ jsx(ItemCard, {
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          group: product.group.value,
          price: product.price,
          isSale: product.isSale,
          specialPrice: product.specialPrice
        }, product.id))
      }), /* @__PURE__ */ jsx(Loading, {
        open: loading
      })]
    })]
  });
};
const index = UNSAFE_withComponentProps(Dashboard);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const renderUserCell = ({
  imageUrl,
  name
}) => /* @__PURE__ */ jsxs("div", {
  className: "flex items-center gap-1.5",
  children: [imageUrl ? /* @__PURE__ */ jsx("img", {
    src: imageUrl,
    alt: "user",
    className: "rounded-full size-8 aspect-square",
    referrerPolicy: "no-referrer"
  }) : /* @__PURE__ */ jsx(Face, {
    className: "text-gray-100",
    sx: {
      fontSize: 32
    }
  }), /* @__PURE__ */ jsx("span", {
    children: name
  })]
});
const renderTypeCell = (type) => {
  const bgColor = {
    admin: "default",
    user: "success"
  };
  return /* @__PURE__ */ jsx(Chip, {
    color: bgColor[type],
    label: type,
    variant: "outlined",
    size: "small"
  });
};
const columns = [{
  id: "name",
  label: "名稱",
  format: (_, row) => renderUserCell(row)
}, {
  id: "email",
  label: "信箱",
  minWidth: 200
}, {
  id: "createdAt",
  label: "創建時間",
  minWidth: 140,
  format: (value) => formatFirestoreTimestamp(value)
}, {
  id: "type",
  label: "類型",
  align: "center",
  format: (value) => renderTypeCell(value)
}];
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getUsers = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "users"));
      const users2 = querySnapshot.docs.map((doc2) => ({
        id: doc2.id,
        ...doc2.data()
      }));
      setUsers(users2);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return /* @__PURE__ */ jsxs("main", {
    className: "wrapper dashboard",
    children: [/* @__PURE__ */ jsx(Header, {
      title: "用戶管理",
      description: "篩選、排序並查看詳細的使用者個人資料。"
    }), /* @__PURE__ */ jsx(BaseTable, {
      columns,
      rows: users,
      stickyHeader: true
    }), /* @__PURE__ */ jsx(Loading, {
      open: isLoading
    })]
  });
};
const allUsers = UNSAFE_withComponentProps(AllUsers);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: allUsers
}, Symbol.toStringTag, { value: "Module" }));
const renderImageCell = ({
  imageUrl,
  name
}) => /* @__PURE__ */ jsx("img", {
  src: imageUrl,
  alt: name,
  className: "rounded size-20 aspect-square m-auto",
  referrerPolicy: "no-referrer"
});
const renderEditCell = ({
  id,
  status
}) => /* @__PURE__ */ jsx(Link, {
  to: status === 1 ? "#" : `/products/${id}`,
  onClick: (e) => {
    if (status === 1) e.preventDefault();
  },
  children: /* @__PURE__ */ jsx(EditNote, {
    sx: {
      fontSize: 32,
      color: status === 1 ? "#ccc" : "#7f7e83",
      cursor: status === 1 ? "not-allowed" : "pointer"
    }
  })
});
const products = () => {
  const [initialProducts, setInitialProducts] = useState([]);
  const [products2, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState({
    message: ""
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    group: "",
    status: "",
    isSale: ""
  });
  const getProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const products3 = querySnapshot.docs.map((doc2) => ({
        id: doc2.id,
        ...doc2.data()
      }));
      setProducts(products3);
      setInitialProducts(products3);
    } finally {
      setLoading(false);
    }
  };
  const renderStatusCell = ({
    id,
    status
  }) => {
    const handleChange = async () => {
      const newStatus = status === 1 ? 0 : 1;
      const typeMsg = status === 1 ? "下架" : "上架";
      setIsSwitching(true);
      try {
        await updateDoc(doc(db, "products", id), {
          status: newStatus
        });
        setAlertState({
          message: `商品${typeMsg}成功`,
          type: "success"
        });
        setAlertOpen(true);
        getProducts();
      } catch (error) {
        setAlertState({
          message: `商品${typeMsg}失敗`,
          type: "error"
        });
        setAlertOpen(true);
      } finally {
        setIsSwitching(false);
      }
    };
    return /* @__PURE__ */ jsx(Switch, {
      checked: status === 1,
      onChange: handleChange,
      disabled: isSwitching,
      color: "primary"
    });
  };
  const columns2 = [{
    id: "imageUrl",
    label: "商品圖片",
    align: "center",
    format: (_, row) => renderImageCell(row)
  }, {
    id: "name",
    label: "商品名稱"
  }, {
    id: "group",
    label: "商品分類",
    format: (group) => group.label
  }, {
    id: "price",
    label: "價格",
    align: "right"
  }, {
    id: "specialPrice",
    label: "特價價格",
    align: "right"
  }, {
    id: "status",
    label: "上架",
    align: "center",
    format: (_, row) => renderStatusCell(row)
  }, {
    id: "edit",
    label: "編輯",
    align: "center",
    format: (_, row) => renderEditCell(row)
  }];
  const filterProducts = () => {
    const newProducts = initialProducts.filter(({
      name,
      group,
      status,
      isSale
    }) => {
      const {
        name: queryName,
        group: queryGroup,
        status: queryStatus,
        isSale: queryIsSale
      } = searchQuery;
      return name.toLowerCase().includes(queryName.toLowerCase()) && (queryGroup === "" || (group == null ? void 0 : group.value) === queryGroup) && (queryStatus === "" || status === Number(queryStatus)) && (queryIsSale === "" || isSale === (queryIsSale === "true"));
    });
    setProducts(newProducts);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return /* @__PURE__ */ jsxs("main", {
    className: "wrapper dashboard",
    children: [/* @__PURE__ */ jsx(Header, {
      title: "商品管理",
      description: "查看商品列表並管理商品資訊，包括新增、編輯、商品上下架功能。",
      ctaText: "新增商品",
      ctaUrl: "/products/create"
    }), /* @__PURE__ */ jsx(ProductSearchBar, {
      searchQuery,
      setSearchQuery,
      onSearch: filterProducts
    }), /* @__PURE__ */ jsx(BaseTable, {
      columns: columns2,
      rows: products2,
      stickyHeader: true
    }), /* @__PURE__ */ jsx(Loading, {
      open: loading
    }), /* @__PURE__ */ jsx(ErrorAlert, {
      open: alertOpen,
      message: alertState.message,
      severity: alertState.type,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right"
      },
      onClose: () => setAlertOpen(false)
    })]
  });
};
const products$1 = UNSAFE_withComponentProps(products);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: products$1
}, Symbol.toStringTag, { value: "Module" }));
const schema = yup.object().shape({
  name: yup.string().required("請輸入商品名稱"),
  describe: yup.string().required("請輸入商品描述"),
  group: yup.string().required("請選擇商品分類"),
  price: yup.number().typeError("價格必須是數字").required("請輸入價格").positive("價格必須大於 0"),
  isSale: yup.boolean().required(),
  specialPrice: yup.number().default(0).typeError("特價價格必須是數字").when("isSale", {
    is: true,
    then: (schema2) => schema2.required("請輸入特價價格").moreThan(0, "特價價格必須大於 0").max(yup.ref("price"), "特價不能高於原價"),
    otherwise: (schema2) => schema2.notRequired()
  })
});
const loader = async ({
  params
}) => {
  var _a;
  const {
    id
  } = params;
  const groupSnapshot = await getDocs(collection(db, "groups"));
  const groupData = groupSnapshot.docs.map((doc2) => doc2.data());
  let product = null;
  if (id) {
    const productSnap = await getDoc(doc(db, "products", id));
    if (productSnap.exists()) {
      const data = productSnap.data();
      product = {
        ...data,
        id: productSnap.id,
        group: ((_a = data.group) == null ? void 0 : _a.value) ?? ""
      };
    }
  }
  return {
    initialProduct: product,
    groups: groupData
  };
};
const productEdit = ({
  loaderData
}) => {
  var _a, _b, _c, _d, _e;
  const navigator = useNavigate();
  const {
    id
  } = useParams();
  const {
    initialProduct,
    groups
  } = loaderData;
  const [selectedImage, setSelectedImage] = useState(null);
  const [alertState, setAlertState] = useState({
    message: ""
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      price: 1,
      specialPrice: 0,
      ...initialProduct
    }
  });
  const isSale = watch("isSale");
  const onSubmit = async (formData) => {
    if (!selectedImage && !(initialProduct == null ? void 0 : initialProduct.imageUrl)) {
      setAlertState({
        message: "請先選擇圖片",
        type: "error"
      });
      setAlertOpen(true);
      return;
    }
    const typeMsg = id ? "編輯" : "新增";
    setLoading(true);
    try {
      let imageUrl = (initialProduct == null ? void 0 : initialProduct.imageUrl) ?? "";
      if (selectedImage) {
        imageUrl = await uploadToCloudinary(selectedImage);
      }
      const selectedGroup = groups.find((group) => group.value === formData.group);
      const productData = {
        ...formData,
        group: selectedGroup,
        imageUrl,
        createdAt: Timestamp.now(),
        status: 0
      };
      if (id) {
        await updateDoc(doc(db, "products", id), productData);
      } else {
        await addDoc(collection(db, "products"), productData);
      }
      setAlertState({
        message: `商品${typeMsg}成功！`,
        type: "success"
      });
      setAlertOpen(true);
      navigator("/products");
    } catch (error) {
      setAlertState({
        message: `${typeMsg}失敗，請稍後再試`,
        type: "error"
      });
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("main", {
    className: "wrapper dashboard",
    children: [/* @__PURE__ */ jsx(Header, {
      title: `${id ? "編輯" : "新增"}商品`
    }), /* @__PURE__ */ jsx("section", {
      className: "mt-2.5 wrapper-md",
      children: /* @__PURE__ */ jsx(Paper, {
        elevation: 3,
        sx: {
          borderRadius: "20px"
        },
        children: /* @__PURE__ */ jsxs(Box, {
          component: "form",
          noValidate: true,
          className: "flex flex-col gap-6 w-full p-10",
          children: [/* @__PURE__ */ jsx(UploadImage, {
            defaultImage: initialProduct == null ? void 0 : initialProduct.imageUrl,
            onImageSelect: (file) => setSelectedImage(file)
          }), /* @__PURE__ */ jsx(TextField, {
            label: "商品名稱",
            variant: "outlined",
            fullWidth: true,
            ...register("name"),
            error: !!errors.name,
            helperText: (_a = errors.name) == null ? void 0 : _a.message
          }), /* @__PURE__ */ jsx(TextField, {
            label: "商品描述",
            variant: "outlined",
            fullWidth: true,
            multiline: true,
            minRows: 4,
            ...register("describe"),
            error: !!errors.describe,
            helperText: (_b = errors.describe) == null ? void 0 : _b.message,
            defaultValue: ""
          }), /* @__PURE__ */ jsx(TextField, {
            select: true,
            label: "商品分類",
            variant: "outlined",
            fullWidth: true,
            ...register("group"),
            error: !!errors.group,
            helperText: (_c = errors.group) == null ? void 0 : _c.message,
            defaultValue: initialProduct == null ? void 0 : initialProduct.group,
            children: groups.map((option) => /* @__PURE__ */ jsx(MenuItem, {
              value: option.value,
              children: option.label
            }, option.value))
          }), /* @__PURE__ */ jsx(TextField, {
            label: "價格",
            variant: "outlined",
            fullWidth: true,
            ...register("price"),
            error: !!errors.price,
            helperText: (_d = errors.price) == null ? void 0 : _d.message
          }), /* @__PURE__ */ jsx(FormControlLabel, {
            control: /* @__PURE__ */ jsx(Checkbox, {
              ...register("isSale")
            }),
            label: "特價商品"
          }), isSale && /* @__PURE__ */ jsx(TextField, {
            label: "特價價格",
            variant: "outlined",
            fullWidth: true,
            ...register("specialPrice"),
            error: !!errors.specialPrice,
            helperText: (_e = errors.specialPrice) == null ? void 0 : _e.message
          }), /* @__PURE__ */ jsx(Button, {
            type: "submit",
            variant: "contained",
            color: "primary",
            fullWidth: true,
            loading,
            loadingPosition: "start",
            onClick: handleSubmit(onSubmit),
            children: id ? "更新商品" : "新增商品"
          })]
        })
      })
    }), /* @__PURE__ */ jsx(ErrorAlert, {
      open: alertOpen,
      message: alertState.message,
      severity: alertState.type,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right"
      },
      onClose: () => setAlertOpen(false)
    })]
  });
};
const productEdit$1 = UNSAFE_withComponentProps(productEdit);
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: productEdit$1,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-MidlPQLP.js", "imports": ["/assets/chunk-NL6KNZEE-CQkoafV0.js", "/assets/index-LvXiyyRQ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DN3v8SDX.js", "imports": ["/assets/chunk-NL6KNZEE-CQkoafV0.js", "/assets/index-LvXiyyRQ.js", "/assets/createTheme-CCn_blMs.js", "/assets/index-DBUmQ_pX.js"], "css": ["/assets/root-D2Pfkszd.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/root/signIn": { "id": "routes/root/signIn", "parentId": "root", "path": "sign-in", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": true, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signIn-CuXfqqDp.js", "imports": ["/assets/chunk-NL6KNZEE-CQkoafV0.js", "/assets/Alert-4o-22xWm.js", "/assets/auth-cSAo9A2T.js", "/assets/config-DlFqBImT.js", "/assets/index.esm-Du1fJ1Qh.js", "/assets/createTheme-CCn_blMs.js", "/assets/index-DBUmQ_pX.js", "/assets/index-LvXiyyRQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/admin-layout": { "id": "routes/admin/admin-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": true, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/admin-layout-CHOV72DI.js", "imports": ["/assets/chunk-NL6KNZEE-CQkoafV0.js", "/assets/utils-De00pD5-.js", "/assets/auth-cSAo9A2T.js", "/assets/config-DlFqBImT.js", "/assets/Alert-4o-22xWm.js", "/assets/index-DhLl5fkL.js", "/assets/createTheme-CCn_blMs.js", "/assets/Face-BdGq5Gnv.js", "/assets/index-DBUmQ_pX.js", "/assets/index-LvXiyyRQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/index": { "id": "routes/admin/index", "parentId": "routes/admin/admin-layout", "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-BfzjsxJj.js", "imports": ["/assets/chunk-NL6KNZEE-CQkoafV0.js", "/assets/Loading-2XmdfwSh.js", "/assets/Header-BLSKRTB6.js", "/assets/config-DlFqBImT.js", "/assets/utils-De00pD5-.js", "/assets/Chip-qccW3AxG.js", "/assets/createTheme-CCn_blMs.js", "/assets/index-LvXiyyRQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/all-users": { "id": "routes/admin/all-users", "parentId": "routes/admin/admin-layout", "path": "all-users", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/all-users-CXBZMzqg.js", "imports": ["/assets/chunk-NL6KNZEE-CQkoafV0.js", "/assets/BaseTable-YSHpC9rB.js", "/assets/Loading-2XmdfwSh.js", "/assets/Header-BLSKRTB6.js", "/assets/utils-De00pD5-.js", "/assets/config-DlFqBImT.js", "/assets/Face-BdGq5Gnv.js", "/assets/Chip-qccW3AxG.js", "/assets/createTheme-CCn_blMs.js", "/assets/index-LvXiyyRQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/products": { "id": "routes/admin/products", "parentId": "routes/admin/admin-layout", "path": "products", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/products-DEF1Ni3p.js", "imports": ["/assets/chunk-NL6KNZEE-CQkoafV0.js", "/assets/BaseTable-YSHpC9rB.js", "/assets/Loading-2XmdfwSh.js", "/assets/Alert-4o-22xWm.js", "/assets/Header-BLSKRTB6.js", "/assets/config-DlFqBImT.js", "/assets/MenuItem-Duz-n7oc.js", "/assets/createTheme-CCn_blMs.js", "/assets/index-DBUmQ_pX.js", "/assets/index-LvXiyyRQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "product-create": { "id": "product-create", "parentId": "routes/admin/admin-layout", "path": "products/create", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/product-edit-CfbWVSCV.js", "imports": ["/assets/chunk-NL6KNZEE-CQkoafV0.js", "/assets/Alert-4o-22xWm.js", "/assets/Header-BLSKRTB6.js", "/assets/index-DhLl5fkL.js", "/assets/config-DlFqBImT.js", "/assets/index.esm-Du1fJ1Qh.js", "/assets/MenuItem-Duz-n7oc.js", "/assets/createTheme-CCn_blMs.js", "/assets/index-DBUmQ_pX.js", "/assets/index-LvXiyyRQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "product-edit": { "id": "product-edit", "parentId": "routes/admin/admin-layout", "path": "products/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/product-edit-CfbWVSCV.js", "imports": ["/assets/chunk-NL6KNZEE-CQkoafV0.js", "/assets/Alert-4o-22xWm.js", "/assets/Header-BLSKRTB6.js", "/assets/index-DhLl5fkL.js", "/assets/config-DlFqBImT.js", "/assets/index.esm-Du1fJ1Qh.js", "/assets/MenuItem-Duz-n7oc.js", "/assets/createTheme-CCn_blMs.js", "/assets/index-DBUmQ_pX.js", "/assets/index-LvXiyyRQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-9c9c8be4.js", "version": "9c9c8be4", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/root/signIn": {
    id: "routes/root/signIn",
    parentId: "root",
    path: "sign-in",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/admin/admin-layout": {
    id: "routes/admin/admin-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/admin/index": {
    id: "routes/admin/index",
    parentId: "routes/admin/admin-layout",
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/admin/all-users": {
    id: "routes/admin/all-users",
    parentId: "routes/admin/admin-layout",
    path: "all-users",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/admin/products": {
    id: "routes/admin/products",
    parentId: "routes/admin/admin-layout",
    path: "products",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "product-create": {
    id: "product-create",
    parentId: "routes/admin/admin-layout",
    path: "products/create",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "product-edit": {
    id: "product-edit",
    parentId: "routes/admin/admin-layout",
    path: "products/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
