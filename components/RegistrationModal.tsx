"use client";

import { useEffect, useRef, useState, useCallback, FormEvent, ChangeEvent } from "react";
import {
  ALLOWED_ROLES,
  RegistrationFormData,
  FormErrors,
  validateFullName,
  validateEmail,
  validatePhone,
  validateRole,
  submitRegistration,
} from "@/lib/api/registration";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  triggerRef,
}: RegistrationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    website_hp: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessView, setIsSuccessView] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
    // Reset views after closing animation completes
    setTimeout(() => {
      setIsSuccessView(false);
      setErrors({});
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        role: "",
        website_hp: "",
      });
    }, 250);
  }, [onClose]);

  // Manage body scroll lock, focus trapping, and focus restoration
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("lock");
      // Focus initial input field
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove("lock");
      // Restore focus to trigger element
      if (triggerRef?.current) {
        triggerRef.current.focus();
      }
    }
  }, [isOpen, triggerRef]);

  // Handle Escape key & Focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        handleClose();
        return;
      }

      // Keyboard focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl?.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let processedValue = value;
    if (name === "phone") {
      // Restrict mobile input to numeric digits only and max 10 chars
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    // Real-time validation clearance
    if (errors[name as keyof FormErrors] || errors.form) {
      let fieldError = "";
      if (name === "fullName") fieldError = validateFullName(processedValue);
      if (name === "email") fieldError = validateEmail(processedValue);
      if (name === "phone") fieldError = validatePhone(processedValue);
      if (name === "role") fieldError = validateRole(processedValue);

      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
        form: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Clean & normalize values
    const cleanedName = formData.fullName.trim().replace(/\s+/g, " ");
    const cleanedEmail = formData.email.trim().toLowerCase();
    const cleanedPhone = formData.phone.trim();
    const cleanedRole = formData.role;

    const nameErr = validateFullName(cleanedName);
    const emailErr = validateEmail(cleanedEmail);
    const phoneErr = validatePhone(cleanedPhone);
    const roleErr = validateRole(cleanedRole);

    const newErrors: FormErrors = {
      fullName: nameErr,
      email: emailErr,
      phone: phoneErr,
      role: roleErr,
      form: "",
    };

    setErrors(newErrors);
    setFormData((prev) => ({
      ...prev,
      fullName: cleanedName,
      email: cleanedEmail,
      phone: cleanedPhone,
    }));

    // If any field error exists, focus the first invalid field
    if (nameErr) {
      nameInputRef.current?.focus();
      return;
    }
    if (emailErr) {
      document.getElementById("email")?.focus();
      return;
    }
    if (phoneErr) {
      document.getElementById("phone")?.focus();
      return;
    }
    if (roleErr) {
      document.getElementById("role")?.focus();
      return;
    }

    // Submit form
    setIsSubmitting(true);
    try {
      const result = await submitRegistration({
        fullName: cleanedName,
        email: cleanedEmail,
        phone: cleanedPhone,
        role: cleanedRole,
        website_hp: formData.website_hp,
      });

      if (result.success) {
        // Clear errors and display neutral success view
        setErrors({});
        setIsSuccessView(true);
        // Clear form values upon confirmed API success
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          role: "",
          website_hp: "",
        });
      } else if (result.status === "VALIDATION_ERROR") {
        const fieldErrors: FormErrors = { form: result.message };
        if (result.errors && typeof result.errors === "object") {
          const errs = result.errors as Record<string, unknown>;
          if (errs.fullName && typeof errs.fullName === "object" && "_errors" in errs.fullName) {
            fieldErrors.fullName = ((errs.fullName as { _errors: string[] })._errors || [])[0];
          }
          if (errs.email && typeof errs.email === "object" && "_errors" in errs.email) {
            fieldErrors.email = ((errs.email as { _errors: string[] })._errors || [])[0];
          }
          if (errs.phone && typeof errs.phone === "object" && "_errors" in errs.phone) {
            fieldErrors.phone = ((errs.phone as { _errors: string[] })._errors || [])[0];
          }
          if (errs.role && typeof errs.role === "object" && "_errors" in errs.role) {
            fieldErrors.role = ((errs.role as { _errors: string[] })._errors || [])[0];
          }
        }
        setErrors(fieldErrors);

        // Focus first invalid field returned by server
        if (fieldErrors.fullName) nameInputRef.current?.focus();
        else if (fieldErrors.email) document.getElementById("email")?.focus();
        else if (fieldErrors.phone) document.getElementById("phone")?.focus();
        else if (fieldErrors.role) document.getElementById("role")?.focus();
      } else {
        // Preserve form inputs on failure and show friendly error message
        setErrors((prev) => ({
          ...prev,
          form: result.message || "Submission failed. Please try again.",
        }));
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred during submission.";
      setErrors((prev) => ({
        ...prev,
        form: errorMessage,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? "open" : ""}`}
      id="registerModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={handleBackdropClick}
    >
      <div className="modal" ref={modalRef}>
        {!isSuccessView ? (
          <div id="formView">
            <div className="modal-head">
              <div>
                <h2 id="modalTitle">Reserve your free seat</h2>
                <p>Enter your details to reserve your seat for the live workshop.</p>
              </div>
              <button
                type="button"
                className="close"
                id="closeModal"
                aria-label="Close registration form"
                onClick={handleClose}
              >
                ×
              </button>
            </div>

            <form id="leadForm" noValidate onSubmit={handleSubmit}>
              {/* Invisible Honeypot Field */}
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="website_hp">Leave empty</label>
                <input
                  type="text"
                  id="website_hp"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_hp}
                  onChange={handleInputChange}
                />
              </div>

              {errors.form && (
                <p className="error" id="formError" aria-live="polite" style={{ marginBottom: "10px" }}>
                  {errors.form}
                </p>
              )}

              <div className="field">
                <label htmlFor="fullName">Full name *</label>
                <input
                  id="fullName"
                  name="fullName"
                  ref={nameInputRef}
                  autoComplete="name"
                  minLength={3}
                  maxLength={100}
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullNameError" : undefined}
                />
                <p className="error" id="fullNameError" aria-live="polite">
                  {errors.fullName}
                </p>
              </div>

              <div className="field">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={254}
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "emailError" : undefined}
                />
                <p className="error" id="emailError" aria-live="polite">
                  {errors.email}
                </p>
              </div>

              <div className="field">
                <label htmlFor="phone">Mobile number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="numeric"
                  minLength={10}
                  maxLength={10}
                  pattern="[6-9][0-9]{9}"
                  required
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phoneError" : undefined}
                />
                <p className="error" id="phoneError" aria-live="polite">
                  {errors.phone}
                </p>
              </div>

              <div className="field">
                <label htmlFor="role">Your role *</label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.role}
                  aria-describedby={errors.role ? "roleError" : undefined}
                >
                  <option value="">Select one</option>
                  {ALLOWED_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <p className="error" id="roleError" aria-live="polite">
                  {errors.role}
                </p>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "8px" }}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Reserve my seat"}
              </button>
            </form>
          </div>
        ) : (
          <div className="success show" id="successView">
            <div className="success-icon">✓</div>
            <h2>Registration successful</h2>
            <p>Your details have been saved.</p>
            <button
              className="btn btn-primary"
              id="doneButton"
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
