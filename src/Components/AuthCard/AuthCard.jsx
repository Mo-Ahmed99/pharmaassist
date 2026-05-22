import { useState } from "react";
import "./AuthCard.css";
import Logo from "./Logo/Logo";
import TabSwitch from "./TabSwitch/TabSwitch";
import InputField from "./InputField/InputField";
import RoleSelector from "./RoleSelector/RoleSelector";
import SubmitButton from "./SubmitButton/SubmitButton";
import { useNavigate } from "react-router-dom";
function AuthCard() {
  const [activeTab, setActiveTab] = useState("signup");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    if (activeTab === "signin") {
      navigate("/homepage");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData({ fullName: "", email: "", password: "" });
  };

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <div className="auth-card__logo-wrap">
          <Logo />
        </div>
        <h1 className="auth-card__title">Welcome to Pharma Guide</h1>
        <p className="auth-card__subtitle">
          {activeTab === "signup"
            ? "Create an account to get started."
            : "Sign in or create an account to continue."}
        </p>
      </div>

      <div className="auth-card__body">
        <TabSwitch activeTab={activeTab} onTabChange={handleTabChange} />

        <form className="auth-card__form" onSubmit={handleSubmit} noValidate>
          {activeTab === "signup" && (
            <InputField
              label="Full name"
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
          )}

          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          {activeTab === "signup" && (
            <RoleSelector selectedRole={role} onRoleChange={setRole} />
          )}

          {activeTab === "signin" && (
            <div className="auth-card__forgot">
              <button type="button" className="auth-card__forgot-btn">
                Forgot password?
              </button>
            </div>
          )}

          <SubmitButton
            label={activeTab === "signup" ? "Create account" : "Sign in"}
            loading={loading}
            onClick={handleSubmit}
          />
        </form>

        <p className="auth-card__footer-text">
          {activeTab === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="auth-card__link"
                onClick={() => handleTabChange("signin")}
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                className="auth-card__link"
                onClick={() => handleTabChange("signup")}
              >
                Sign up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthCard;
