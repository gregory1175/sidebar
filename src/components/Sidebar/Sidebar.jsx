import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChartLine,
  faChartColumn,
  faWallet,
  faChartPie,
  faEnvelope,
  faSliders,
  faPhoneVolume,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import { useTheme } from "../../styles/ThemeProvider";

const routes = [
  { title: "Home", icon: faHouse, path: "/" },
  { title: "Sales", icon: faChartLine, path: "/sales" },
  { title: "Costs", icon: faChartColumn, path: "/costs" },
  { title: "Payments", icon: faWallet, path: "/payments" },
  { title: "Finances", icon: faChartPie, path: "/finances" },
  { title: "Messages", icon: faEnvelope, path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: faSliders, path: "/settings" },
  { title: "Support", icon: faPhoneVolume, path: "/support" },
];

const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "opened",
})`
  width: ${({ opened }) => (opened ? "240px" : "72px")};
  background: var(--bg-sidebar);
  color: var(--text-default);
  transition: width
    ${({ opened }) => (opened ? "0.25s ease-out" : "0.150s ease-in-out")};
  display: flex;
  flex-direction: column;
  height: 100vh;
  user-select: none;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  img {
    width: 32px;
    height: 32px;
  }
  span {
    color: var(--logo-color);
    font-weight: bold;
    margin-left: 8px;
    white-space: nowrap;
  }
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "opened",
})`
  position: absolute;
  right: ${({ opened }) => (opened ? "-0.5rem" : "-2rem")};
  background: ${({ opened }) =>
    opened ? "var(--bg-page)" : "var(--bg-sidebar)"};
  border: none;
  color: var(--text-default);
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 50%;
  // Анимация ширины зависит от направления: открытие — медленное, закрытие — быстрее
  transition: background 0.3s ease,
    right ${({ opened }) => (opened ? "0.25s ease-out" : "0.150s ease-in-out")};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  &:hover {
    background: var(--bg-active);
  }
`;

const NavList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
`;

const Tooltip = styled.div`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
  background: var(--tooltip-bg, #f8f9fa); /* default, переопределяется в теме */
  color: var(--tooltip-color, #111);
  padding: 6px 10px;
  white-space: nowrap;
  border-radius: 6px;
  font-size: 13px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);

  &::before {
    content: "";
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: transparent var(--tooltip-bg, #f8f9fa) transparent transparent;
  }
`;

const NavItemWrapper = styled.div`
  position: relative;

  &:hover ${Tooltip} {
    opacity: 1;
  }
`;

const NavItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "opened",
})`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  color: var(--text-default);
  transition: background 0.3s, color 0.3s;
  white-space: nowrap;
  user-select: none;
  overflow: hidden;
  position: relative;

  &:hover {
    background: var(--bg-hover);
    color: var(--text-hover);
  }

  &:hover ${Tooltip} {
    opacity: 1;
  }

  &.active {
    background: var(--bg-active);
    color: var(--text-active);

    svg {
      color: var(--text-active);
    }
  }

  svg {
    color: inherit;
    min-width: 20px;
    font-size: 18px;
    flex-shrink: 0;
  }

  span {
    margin-left: ${({ opened }) => (opened ? "12px" : "0")};
    max-width: ${({ opened }) => (opened ? "200px" : "0")};
    opacity: ${({ opened }) => (opened ? 1 : 0)};
    // Анимация появления/исчезновения текста
    transition: max-width
        ${({ opened }) => (opened ? "0.25s ease-out" : "0.150s ease-in-out")},
      opacity
        ${({ opened }) => (opened ? "0.25s ease-out" : "0.150s ease-in-out")},
      margin-left
        ${({ opened }) => (opened ? "0.25s ease-out" : "0.150s ease-in-out")};
  }
`;

const BottomBlock = styled.div`
  padding: 0 0.5rem 1rem;
`;

const ThemeSwitchButton = styled.button`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  background: var(--btn-bg);
  border: none;
  border-radius: 8px;
  color: var(--text-default);
  cursor: pointer;
  transition: background 0.3s;
  user-select: none;
  &:active {
    background: var(--btn-bg-active);
  }
  &:hover {
    background: var(--bg-hover);
  }
`;

const Sidebar = () => {
  const [opened, setOpened] = useState(true);
  const { toggleTheme } = useTheme();

  const [activePath, setActivePath] = useState("/");

  const goToRoute = (path) => {
    setActivePath(path);
    console.log(`going to ${path}`);
  };

  return (
    <SidebarContainer opened={opened} aria-expanded={opened}>
      <Header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="TensorFlow logo" />
          {opened && <span>TensorFlow</span>}
        </div>
        <ToggleButton
          opened={opened}
          aria-label={opened ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setOpened(!opened)}
        >
          <FontAwesomeIcon icon={opened ? faAngleLeft : faAngleRight} />
        </ToggleButton>
      </Header>

      <NavList>
        {routes.map(({ title, icon, path }) => (
          <NavItemWrapper key={title}>
            <NavItem
              opened={opened}
              onClick={() => goToRoute(path)}
              className={activePath === path ? "active" : ""}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") goToRoute(path);
              }}
            >
              <FontAwesomeIcon icon={icon} />
              <span>{title}</span>
            </NavItem>
            {!opened && <Tooltip>{title}</Tooltip>}
          </NavItemWrapper>
        ))}
      </NavList>

      <BottomBlock>
        {bottomRoutes.map(({ title, icon, path }) => (
          <NavItemWrapper key={title}>
            <NavItem
              opened={opened}
              onClick={() => goToRoute(path)}
              className={activePath === path ? "active" : ""}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") goToRoute(path);
              }}
            >
              <FontAwesomeIcon icon={icon} />
              <span>{title}</span>
            </NavItem>
            {!opened && <Tooltip>{title}</Tooltip>}
          </NavItemWrapper>
        ))}
        <ThemeSwitchButton onClick={toggleTheme} type="button">
          Toggle Theme
        </ThemeSwitchButton>
      </BottomBlock>
    </SidebarContainer>
  );
};

export default Sidebar;
