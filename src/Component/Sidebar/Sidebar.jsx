import { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaBars,
  FaSignOutAlt,
  FaBook,
  FaUser,
  FaList,
  FaUserGraduate,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Fix the navigate function reference issue
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Define menu items for Admin
  const adminMenuItems = [
    {
      header: "Main",
      links: [
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: FaHome,
        },
      ],
    },
    {
      header: "Courses",
      links: [
        {
          label: "Courses",
          path: "/courses",
          icon: FaBook,
          onClick: () => handleNavigation("/courses"),
        },
        {
          label: "Course Category",
          path: "/category",
          icon: FaList,
          onClick: () => handleNavigation("/category"),
        },
      ],
    },
    {
      header: "Students",
      links: [
        {
          label: "Student",
          path: "/student",
          icon: FaUser,
          onClick: () => handleNavigation("/student"),
        },
        {
          label: "Enrolled Student",
          path: "/enrollment",
          icon: FaUserGraduate,
          onClick: () => handleNavigation("/enrollment"),
        },
      ],
    },
    {
      header: "System",
      links: [
        {
          label: "Logout",
          path: "/",
          icon: FaSignOutAlt,
          onClick: () => {
            // Clear frontend authentication data
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("userData");
            localStorage.removeItem("rememberedEmail");
            // Redirect to login page
            window.location.href = "/";
          },
        },
      ],
    },
  ];

  // Select menu items
  const menuItems = adminMenuItems;

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle clicks outside sidebar to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains("mobile-menu-toggle") &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile menu toggle button */}
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <FaBars />
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={toggleMobileMenu} />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar ${isMinimized ? "minimized" : ""} ${
          isMobileMenuOpen ? "mobile-open" : ""
        }`}
        ref={sidebarRef}
      >
        {/* Minimize button - visible only on desktop */}
        <button className="minimize-button" onClick={toggleSidebar}>
          <FaBars />
        </button>

        {/* Menu sections */}
        <div className="sidebar-content">
          {menuItems.map((section, idx) => (
            <div className="sidebar-section" key={idx}>
              {!isMinimized && (
                <p className="sidebar-header">{section.header}</p>
              )}
              <ul className="list-unstyled">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.external ? (
                      <a
                        href={link.path}
                        className={`sidebar-link ${
                          location.pathname === link.path ? "active" : ""
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <link.icon className="icon" />
                        {!isMinimized && <span>{link.label}</span>}
                        {!isMinimized && link.badge && (
                          <span className="badge bg-danger rounded-pill ms-auto">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className={`sidebar-link ${
                          location.pathname === link.path ? "active" : ""
                        }`}
                        onClick={link.onClick}
                      >
                        <link.icon className="icon" />
                        {!isMinimized && <span>{link.label}</span>}
                        {!isMinimized && link.badge && (
                          <span className="badge bg-danger rounded-pill ms-auto">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
