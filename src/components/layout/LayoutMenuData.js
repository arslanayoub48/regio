import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const administrationSubMenu = (role) => {
  return [
    {
      id: "users",
      label: "Users",
      link: "/admin/users",
      parentId: "administration",
    },
    {
      id: "statistics",
      label: "Statistics",
      link: "/admin/statistics",
      parentId: "administration",
    },
    role == "regional-admin"
      ? {
          id: "nearer-region",
          label: "Nearer Region",
          link: "#",
          parentId: "administration",
        }
      : {},
    role == "regional-admin"
      ? {
          id: "projects",
          label: "Projects",
          link: "#",
          parentId: "administration",
        }
      : {},
    {
      id: "send-mails",
      label: "Send Mails",
      link: "/admin/send-mails",
      parentId: "administration",
    },
    role == "super-admin"
      ? {
          id: "regions",
          label: "Regions",
          link: "/admin/regions",
          parentId: "administration",
        }
      : {},
    role == "super-admin"
      ? {
          id: "levels",
          label: "Levels",
          link: "/admin/levels",
          parentId: "administration",
        }
      : {},
    role == "super-admin"
      ? {
          id: "currency-transformer",
          label: "Currency Transformer",
          link: "#",
          parentId: "administration",
        }
      : {},
    {
      id: "transactions",
      label: "Transactions",
      link: "#",
      parentId: "administration",
    },
    {
      id: "ideas",
      label: "Ideas",
      link: "#",
      parentId: "administration",
    },
  ].filter((item) => Object.keys(item).length !== 0);
};

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isTrade, setIsTrade] = useState(false);
  const [isWork, setIsWork] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isResources, setIsRecources] = useState(false);
  const [isCommunication, setIsCommunication] = useState(false);
  const { adminRole } = useSelector((state) => state.Auth);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Trade") {
      setIsTrade(false);
    }
    if (iscurrentState !== "Work") {
      setIsWork(false);
    }
    if (iscurrentState !== "Recources") {
      setIsRecources(false);
    }
    if (iscurrentState !== "Communication") {
      setIsCommunication(false);
    }
    if (iscurrentState !== "Administartion") {
      setIsAdmin(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isTrade,
    isWork,
    isResources,
    isCommunication,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Home",
      icon: "ri-home-2-line",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "timeline",
          label: "Timeline",
          link: "#",
          parentId: "dashboard",
        },
        {
          id: "notifications",
          label: "Notifications",
          link: "#",
          parentId: "dashboard",
        },
        {
          id: "chat",
          label: "Chat",
          link: "#",
          parentId: "dashboard",
        },
        {
          id: "flexiblePanels",
          label: "Flexible Panels",
          link: "#",
          parentId: "dashboard",
        },
        {
          id: "contacts",
          label: "Contacts",
          link: "#",
          parentId: "dashboard",
        },
      ],
    },
    {
      id: "trade",
      label: "Trade",
      icon: "ri-line-chart-line",
      link: "/#",
      stateVariables: isTrade,
      click: function (e) {
        e.preventDefault();
        setIsTrade(!isTrade);
        setIscurrentState("Trade");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "products",
          label: "Products",
          link: "/module/products",
          parentId: "trade",
        },
        {
          id: "searchAndFind",
          label: "Search & Find",
          link: "/module/search-find",
          parentId: "trade",
        },
        {
          id: "orders",
          label: "Orders",
          link: "/module/orders",
          parentId: "trade",
        },
        {
          id: "warehouse",
          label: "Warehouse",
          link: "#",
          parentId: "trade",
        },
      ],
    },
    {
      id: "work",
      label: "Work",
      icon: "ri-hammer-line",
      link: "/#",
      stateVariables: isWork,
      click: function (e) {
        e.preventDefault();
        setIsWork(!isTrade);
        setIscurrentState("Work");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "serivces",
          label: "Services",
          link: "#",
          parentId: "work",
        },
        {
          id: "Jobs",
          label: "Jobs",
          link: "#",
          parentId: "work",
        },
        {
          id: "business",
          label: "Business",
          link: "#",
          parentId: "trade",
        },
      ],
    },
    {
      id: "recources",
      label: "Recources",
      icon: "ri-team-line",
      link: "/#",
      stateVariables: isResources,
      click: function (e) {
        e.preventDefault();
        setIsWork(!isResources);
        setIsRecources("Recources");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "rentals",
          label: "Rentals",
          link: "/module/rentals",
          parentId: "recources",
        },
        {
          id: "carPooling",
          label: "Car Pooling",
          link: "/module/car-pooling",
          parentId: "recources",
        },
        {
          id: "events",
          label: "Events",
          link: "/module/events",
          parentId: "recources",
        },
        {
          id: "foodEvents",
          label: "Food Events",
          link: "/module/food-events",
          parentId: "recources",
        },
        {
          id: "projects",
          label: "Projects",
          link: "#",
          parentId: "recources",
        },
        {
          id: "sources",
          label: "Sources",
          link: "#",
          parentId: "recources",
        },
        {
          id: "ideas",
          label: "Ideas",
          link: "#",
          parentId: "recources",
        },
      ],
    },
    {
      id: "communication",
      label: "Communication",
      icon: "ri-message-2-line",
      link: "/#",
      stateVariables: isCommunication,
      click: function (e) {
        e.preventDefault();
        setIsCommunication(!isCommunication);
        setIscurrentState("Communication");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "chat",
          label: "Chat",
          link: "#",
          parentId: "Communication",
        },
        {
          id: "SystemMessages",
          label: "System Messages",
          link: "#",
          parentId: "Communication",
        },
        {
          id: "taskList",
          label: "Task List",
          link: "#",
          parentId: "Communication",
        },
      ],
    },
    adminRole == "regional-admin" || adminRole == "super-admin"
      ? {
          id: "administration",
          label: "Administration",
          icon: "ri-user-line",
          link: "/#",
          className: "text-danger",
          stateVariables: isAdmin,
          click: function (e) {
            e.preventDefault();
            setIsAdmin(!isAdmin);
            setIscurrentState("Administration");
            updateIconSidebar(e);
          },
          subItems: administrationSubMenu(adminRole),
        }
      : {},
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
