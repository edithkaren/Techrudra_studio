import { useEffect } from "react";
import { useNavigate } from "react-router";

/** /projects → jump to the Selected Work section on the landing page. */
export default function ProjectsRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/#portfolio", { replace: true });
    // After navigation, smooth-scroll to the section
    requestAnimationFrame(() => {
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
    });
  }, [navigate]);
  return null;
}
