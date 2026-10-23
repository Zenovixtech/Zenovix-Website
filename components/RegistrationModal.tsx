"use client";

import { useEffect, useRef, useState, useCallback, FormEvent, ChangeEvent } from "react";
import {
  ALLOWED_ROLES,
  ServiceInterest,
  RegistrationFormData,
  FormErrors,
  validateFullName,
  validateEmail,
  validatePhone,
  validateRole,
  validateServiceInterest,
  submitRegistration,
} from "@/lib/api/registration";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  prefilledFields?: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
}

export default function RegistrationModal({
  isOpen,
  onClose,
  triggerRef,
  prefilledFields,
}: RegistrationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const getInitialServiceInterest = useCallback((): ServiceInterest => {
    return "Learning Hub";
  }, []);

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: prefilledFields?.fullName || "",
    email: prefilledFields?.email || "",
    phone: prefilledFields?.phone || "",
    role: "",
    serviceInterest: "Learning Hub",
    website_hp: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessView, setIsSuccessView] = useState(false);

  // Sync service preselection and prefilled fields whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        fullName: prefilledFields?.fullName ?? prev.fullName,
        email: prefilledFields?.email ?? prev.email,
        phone: prefilledFields?.phone ?? prev.phone,
        serviceInterest: "Learning Hub",
      }));
    }
  }, [isOpen, prefilledFields]);

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
        serviceInterest: getInitialServiceInterest(),
        website_hp: "",
      });
    }, 250);
  }, [onClose, getInitialServiceInterest]);

  // Manage body scroll lock, focus trapping, and focus restoration
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("lock");
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove("lock");
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

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

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
      if (name === "serviceInterest") fieldError = validateServiceInterest(processedValue);

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
    const cleanedService = formData.serviceInterest;

    const nameErr = validateFullName(cleanedName);
    const emailErr = validateEmail(cleanedEmail);
    const phoneErr = validatePhone(cleanedPhone);
    const roleErr = validateRole(cleanedRole);
    const serviceErr = validateServiceInterest(cleanedService);

    const newErrors: FormErrors = {
      fullName: nameErr,
      email: emailErr,
      phone: phoneErr,
      role: roleErr,
      serviceInterest: serviceErr,
      form: "",
    };

    setErrors(newErrors);
    setFormData((prev) => ({
      ...prev,
      fullName: cleanedName,
      email: cleanedEmail,
      phone: cleanedPhone,
    }));

    // Focus first invalid field
    if (nameErr) {
      nameInputRef.current?.focus();
      return;
    }
    if (phoneErr) {
      document.getElementById("phone")?.focus();
      return;
    }
    if (emailErr) {
      document.getElementById("email")?.focus();
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
        serviceInterest: cleanedService,
        website_hp: formData.website_hp,
      });

      if (result.success) {
        setErrors({});
        setIsSuccessView(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          role: "",
          serviceInterest: getInitialServiceInterest(),
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

        if (fieldErrors.fullName) nameInputRef.current?.focus();
        else if (fieldErrors.phone) document.getElementById("phone")?.focus();
        else if (fieldErrors.email) document.getElementById("email")?.focus();
        else if (fieldErrors.role) document.getElementById("role")?.focus();
      } else {
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
      role="presentation"
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div
        className="modal enquiry-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        aria-describedby="modalSubtitle"
      >
        {isSuccessView ? (
          <div className="enquiry-success-view">
            <div className="enquiry-success-icon" aria-hidden="true">✓</div>
            <h2 id="modalTitle">Seat reserved successfully.</h2>
            <p id="modalSubtitle">
              Your details have been saved. Our masterclass coordinator will send webinar access links
              and curriculum material shortly.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              id="doneButton"
              onClick={handleClose}
              autoFocus
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="enquiry-modal-content">
            {/* Modal Header without cross button */}
            <div className="modal-head enquiry-head">
              <div className="enquiry-head-copy">
                <span className="mono-label enquiry-badge">{"// LEARNING HUB REGISTRATION"}</span>
                <h2 id="modalTitle">Reserve your seat</h2>
                <p id="modalSubtitle">Enter your details to reserve your seat for the live masterclass.</p>
              </div>
            </div>

            <form id="leadForm" noValidate onSubmit={handleSubmit} className="enquiry-form-grid">
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
                <div className="enquiry-form-error-banner" role="alert" aria-live="polite">
                  {errors.form}
                </div>
              )}

              {/* Row 1: Full name & Mobile number */}
              <div className="enquiry-two-col">
                <div className="enquiry-field">
                  <label htmlFor="fullName">Full name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    ref={nameInputRef}
                    autoComplete="name"
                    minLength={3}
                    maxLength={100}
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "fullNameError" : undefined}
                  />
                  {errors.fullName && (
                    <span className="field-error" id="fullNameError" aria-live="polite">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="enquiry-field">
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
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phoneError" : undefined}
                  />
                  {errors.phone && (
                    <span className="field-error" id="phoneError" aria-live="polite">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Work email & Your role */}
              <div className="enquiry-two-col">
                <div className="enquiry-field">
                  <label htmlFor="email">Work email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={254}
                    required
                    placeholder="e.g. priya.sharma@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "emailError" : undefined}
                  />
                  {errors.email && (
                    <span className="field-error" id="emailError" aria-live="polite">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="enquiry-field">
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
                    <option value="">Select your role</option>
                    {ALLOWED_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <span className="field-error" id="roleError" aria-live="polite">
                      {errors.role}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Row */}
              <div className="enquiry-submit-row">
                <button
                  className="btn btn-primary enquiry-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Reserve my seat"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
