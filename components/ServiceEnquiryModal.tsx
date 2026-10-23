"use client";

import { useEffect, useRef, useState, useCallback, useMemo, FormEvent, ChangeEvent } from "react";
import {
  TALENT_SPECIALISMS,
  TALENT_HIRING_MODELS,
  TalentSpecialism,
  TalentHiringModel,
  EnquiryFormErrors,
  validateEnquiryFullName,
  validateCompanyName,
  validateWorkEmail,
  validateOptionalPhone,
  normalizePhoneForSubmission,
  validateTalentSpecialism,
  validateTalentHiringModel,
  validateTeamSize,
  validateEnquiryMessage,
  submitBusinessEnquiry,
} from "@/lib/api/enquiry";
import {
  TECHNOLOGY_CATEGORIES,
  TechnologyCategory,
  getTopicsForCategory,
  getCategoryForTopic,
} from "@/lib/technology-services-data";

export type EnquiryModalMode = "select" | "talent" | "technology";

export interface CommonEnquiryFields {
  fullName: string;
  companyName: string;
  workEmail: string;
  phone: string;
}

interface ServiceEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  initialMode?: EnquiryModalMode;
  initialTopic?: string;
  initialCommonFields?: Partial<CommonEnquiryFields>;
  onSelectLearningHub: (commonFields: { fullName: string; email: string; phone?: string }) => void;
}

export default function ServiceEnquiryModal({
  isOpen,
  onClose,
  triggerRef,
  initialMode = "select",
  initialTopic = "",
  initialCommonFields,
  onSelectLearningHub,
}: ServiceEnquiryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const firstSelectCardRef = useRef<HTMLButtonElement>(null);

  const [mode, setMode] = useState<EnquiryModalMode>(initialMode);

  // Common Fields
  const [commonFields, setCommonFields] = useState<CommonEnquiryFields>({
    fullName: initialCommonFields?.fullName || "",
    companyName: initialCommonFields?.companyName || "",
    workEmail: initialCommonFields?.workEmail || "",
    phone: initialCommonFields?.phone || "",
  });

  // Talent Specific Fields
  const [talentFields, setTalentFields] = useState({
    specialism: "" as TalentSpecialism | "",
    hiringModel: "" as TalentHiringModel | "",
    teamSize: "",
    message: "",
  });

  // Technology Specific Fields (Services, Expertise, Solutions)
  const [technologyFields, setTechnologyFields] = useState({
    category: (initialTopic ? getCategoryForTopic(initialTopic) : "Services") as TechnologyCategory,
    topic: initialTopic || "",
    scope: "",
    message: "",
  });

  // Spam Protection Honeypot
  const [websiteHp, setWebsiteHp] = useState("");

  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Derive available topics dynamically based on selected category
  const availableTopics = useMemo(() => {
    return getTopicsForCategory(technologyFields.category);
  }, [technologyFields.category]);

  // Sync mode and topic whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      if (initialTopic) {
        const derivedCategory = getCategoryForTopic(initialTopic);
        setTechnologyFields((prev) => ({
          ...prev,
          category: derivedCategory,
          topic: initialTopic,
        }));
      }
      if (initialCommonFields) {
        setCommonFields((prev) => ({
          ...prev,
          ...initialCommonFields,
        }));
      }
    }
  }, [isOpen, initialMode, initialTopic, initialCommonFields]);

  // Handle focus management and body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("lock");
      const timer = setTimeout(() => {
        if (mode === "select") {
          firstSelectCardRef.current?.focus();
        } else {
          firstInputRef.current?.focus();
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove("lock");
      if (triggerRef?.current) {
        triggerRef.current.focus();
      }
    }
  }, [isOpen, mode, triggerRef]);

  // Reset state on close
  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setErrors({});
      setMode(initialMode);
      setWebsiteHp("");
      setTalentFields({
        specialism: "",
        hiringModel: "",
        teamSize: "",
        message: "",
      });
      setTechnologyFields({
        category: initialTopic ? getCategoryForTopic(initialTopic) : "Services",
        topic: initialTopic || "",
        scope: "",
        message: "",
      });
    }, 250);
  }, [onClose, initialMode, initialTopic]);

  // Keyboard navigation: Escape key & focus trapping
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

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Backdrop click dismissal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };


  // Field change handlers that clear field-specific errors
  const handleCommonChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommonFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnquiryFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTalentChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTalentFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnquiryFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTechnologyChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "category") {
      const nextCategory = value as TechnologyCategory;
      const nextTopics = getTopicsForCategory(nextCategory);
      setTechnologyFields((prev) => ({
        ...prev,
        category: nextCategory,
        topic: nextTopics.includes(prev.topic) ? prev.topic : "",
      }));
    } else {
      setTechnologyFields((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof EnquiryFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Common field validation
    const nameErr = validateEnquiryFullName(commonFields.fullName);
    const companyErr = validateCompanyName(commonFields.companyName);
    const emailErr = validateWorkEmail(commonFields.workEmail);
    const phoneErr = validateOptionalPhone(commonFields.phone);

    const newErrors: EnquiryFormErrors = {
      fullName: nameErr || undefined,
      companyName: companyErr || undefined,
      workEmail: emailErr || undefined,
      phone: phoneErr || undefined,
    };

    // 2. Service-specific validation
    if (mode === "talent") {
      const specErr = validateTalentSpecialism(talentFields.specialism);
      const modelErr = validateTalentHiringModel(talentFields.hiringModel);
      const teamErr = validateTeamSize(talentFields.teamSize);
      const msgErr = validateEnquiryMessage(talentFields.message);

      newErrors.specialism = specErr || undefined;
      newErrors.hiringModel = modelErr || undefined;
      newErrors.teamSize = teamErr || undefined;
      newErrors.message = msgErr || undefined;
    } else if (mode === "technology") {
      if (!technologyFields.category) {
        newErrors.category = "Please select an area: Services, Expertise, or Solutions.";
      }
      const msgErr = validateEnquiryMessage(technologyFields.message);
      newErrors.message = msgErr || undefined;
    }

    // Check for errors
    const hasErrors = Object.values(newErrors).some((err) => !!err);
    if (hasErrors) {
      setErrors(newErrors);

      // Focus first invalid field
      if (newErrors.fullName) {
        firstInputRef.current?.focus();
        return;
      }
      if (newErrors.companyName) {
        document.getElementById("enquiryCompanyName")?.focus();
        return;
      }
      if (newErrors.workEmail) {
        document.getElementById("enquiryWorkEmail")?.focus();
        return;
      }
      if (newErrors.phone) {
        document.getElementById("enquiryPhone")?.focus();
        return;
      }
      if (mode === "talent") {
        if (newErrors.specialism) {
          document.getElementById("enquirySpecialism")?.focus();
          return;
        }
        if (newErrors.hiringModel) {
          document.getElementById("enquiryHiringModel")?.focus();
          return;
        }
        if (newErrors.teamSize) {
          document.getElementById("enquiryTeamSize")?.focus();
          return;
        }
        if (newErrors.message) {
          document.getElementById("enquiryMessage")?.focus();
          return;
        }
      } else if (mode === "technology") {
        if (newErrors.category) {
          document.getElementById("enquiryCategory")?.focus();
          return;
        }
        if (newErrors.message) {
          document.getElementById("enquiryMessage")?.focus();
          return;
        }
      }
      return;
    }

    // 3. Dispatch API submission
    setIsSubmitting(true);
    setErrors({});

    try {
      const normalizedPhone = normalizePhoneForSubmission(commonFields.phone);

      const payload =
        mode === "talent"
          ? {
              serviceInterest: "Talent Deployment" as const,
              fullName: commonFields.fullName.trim().replace(/\s+/g, " "),
              companyName: commonFields.companyName.trim().replace(/\s+/g, " "),
              workEmail: commonFields.workEmail.trim().toLowerCase(),
              phone: normalizedPhone,
              message: talentFields.message.trim(),
              talentDetails: {
                specialism: talentFields.specialism as TalentSpecialism,
                hiringModel: talentFields.hiringModel as TalentHiringModel,
                teamSize: talentFields.teamSize.trim() || undefined,
              },
              website_hp: websiteHp,
            }
          : {
              serviceInterest: "Technology Services" as const,
              fullName: commonFields.fullName.trim().replace(/\s+/g, " "),
              companyName: commonFields.companyName.trim().replace(/\s+/g, " "),
              workEmail: commonFields.workEmail.trim().toLowerCase(),
              phone: normalizedPhone,
              message: technologyFields.message.trim(),
              technologyDetails: {
                category: technologyFields.category,
                topic: technologyFields.topic.trim() || undefined,
                scope: technologyFields.scope.trim() || undefined,
              },
              website_hp: websiteHp,
            };

      const result = await submitBusinessEnquiry(payload);

      if (result.success) {
        setIsSuccess(true);
        // Clear entered form values on confirmed success
        setCommonFields({
          fullName: "",
          companyName: "",
          workEmail: "",
          phone: "",
        });
        setTalentFields({
          specialism: "",
          hiringModel: "",
          teamSize: "",
          message: "",
        });
        setTechnologyFields({
          category: "Services",
          topic: "",
          scope: "",
          message: "",
        });
      } else {
        if (result.fieldErrors) {
          setErrors(result.fieldErrors);
        } else {
          setErrors({ general: result.message });
        }
      }
    } catch {
      setErrors({
        general: "We encountered an unexpected connection issue. Please try submitting again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine Titles and Headings
  const getHeaderMeta = () => {
    if (mode === "select") {
      return {
        badge: "// SERVICE SELECTION",
        title: "How can Zenovix assist your organisation?",
        subtitle: "Select the practice area matching your roadmap requirements.",
      };
    }
    if (mode === "talent") {
      return {
        badge: "// TALENT DEPLOYMENT INQUIRY",
        title: "Deploy Vetted Specialists with Zenovix",
        subtitle:
          "Tell us what your programme needs. A technical recruiter will respond with an exact shortlist within 48 hours.",
      };
    }
    return {
      badge: "// TECHNOLOGY SERVICES INQUIRY",
      title: "Request Enterprise Technology Discovery",
      subtitle:
        "Connect with our SAP, Cloud, and AI architects for structured roadmap discovery and scoping.",
    };
  };

  const headerMeta = getHeaderMeta();

  return (
    <div
      className={`modal-backdrop ${isOpen ? "open" : ""}`}
      id="serviceEnquiryModalBackdrop"
      role="presentation"
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div
        className="modal enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiryModalTitle"
        aria-describedby="enquiryModalSubtitle"
        ref={modalRef}
      >
        {isSuccess ? (
          <div className="enquiry-success-view">
            <div className="enquiry-success-icon" aria-hidden="true">✓</div>
            <h2 id="enquiryModalTitle">Your enquiry has been received.</h2>
            <p id="enquiryModalSubtitle">
              Thank you for reaching out. Our practice leads have received your details and will
              respond within one business day with relevant case studies and next steps.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClose}
              autoFocus
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="enquiry-modal-content">
            {/* Modal Header */}
            <div className="modal-head enquiry-head">
              <div className="enquiry-head-copy">
                <span className="mono-label enquiry-badge">{headerMeta.badge}</span>
                <h2 id="enquiryModalTitle">{headerMeta.title}</h2>
                <p id="enquiryModalSubtitle">{headerMeta.subtitle}</p>
              </div>
            </div>

            {/* General Server/Validation Error Banner */}
            {errors.general && (
              <div className="enquiry-form-error-banner" role="alert" aria-live="polite">
                {errors.general}
              </div>
            )}

            {/* STEP 1: SERVICE SELECTION */}
            {mode === "select" && (
              <div className="service-selector-wrap" role="group" aria-label="Available Services">
                {/* 1. Learning Hub */}
                <button
                  ref={firstSelectCardRef}
                  type="button"
                  className="service-selector-card"
                  onClick={() => {
                    handleClose();
                    onSelectLearningHub({
                      fullName: commonFields.fullName,
                      email: commonFields.workEmail,
                      phone: commonFields.phone,
                    });
                  }}
                >
                  <div className="selector-card-top">
                    <span className="selector-badge">PRACTICAL WORKSHOPS</span>
                    <span className="selector-arrow" aria-hidden="true">→</span>
                  </div>
                  <strong>Learning Hub</strong>
                  <span>
                    Upskill your team with practical live masterclasses on AI, Excel, and automated reporting.
                  </span>
                </button>

                {/* 2. Talent Deployment */}
                <button
                  type="button"
                  className="service-selector-card"
                  onClick={() => setMode("talent")}
                >
                  <div className="selector-card-top">
                    <span className="selector-badge">SPECIALIST STAFFING</span>
                    <span className="selector-arrow" aria-hidden="true">→</span>
                  </div>
                  <strong>Talent Deployment</strong>
                  <span>
                    Deploy vetted SAP IS-U, SAP Functional/Technical, AI &amp; Data, and Non-SAP IT specialists across India.
                  </span>
                </button>

                {/* 3. Technology Services */}
                <button
                  type="button"
                  className="service-selector-card"
                  onClick={() => setMode("technology")}
                >
                  <div className="selector-card-top">
                    <span className="selector-badge">SERVICES · EXPERTISE · SOLUTIONS</span>
                    <span className="selector-arrow" aria-hidden="true">→</span>
                  </div>
                  <strong>Technology Services</strong>
                  <span>
                    Architect, implement, and support mission-critical SAP S/4HANA, AI systems, cloud, and cybersecurity.
                  </span>
                </button>
              </div>
            )}

            {/* STEP 2: BUSINESS ENQUIRY FORMS (TALENT OR TECHNOLOGY) */}
            {mode !== "select" && (
              <form noValidate onSubmit={handleSubmit} className="enquiry-form-grid">
                {/* Invisible Spam Honeypot */}
                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="enquiry_website_hp">Leave empty</label>
                  <input
                    type="text"
                    id="enquiry_website_hp"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={websiteHp}
                    onChange={(e) => setWebsiteHp(e.target.value)}
                  />
                </div>

                {/* Common Row 1: Full name & Company */}
                <div className="enquiry-two-col">
                  <div className="enquiry-field">
                    <label htmlFor="enquiryFullName">Full name *</label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      id="enquiryFullName"
                      name="fullName"
                      required
                      autoComplete="name"
                      placeholder="e.g. Priya Sharma"
                      value={commonFields.fullName}
                      onChange={handleCommonChange}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullNameErr" : undefined}
                    />
                    {errors.fullName && (
                      <span className="field-error" id="fullNameErr" aria-live="polite">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="enquiry-field">
                    <label htmlFor="enquiryCompanyName">Company *</label>
                    <input
                      type="text"
                      id="enquiryCompanyName"
                      name="companyName"
                      required
                      autoComplete="organization"
                      placeholder="e.g. Tata Steel / Acme Corp"
                      value={commonFields.companyName}
                      onChange={handleCommonChange}
                      aria-invalid={!!errors.companyName}
                      aria-describedby={errors.companyName ? "companyNameErr" : undefined}
                    />
                    {errors.companyName && (
                      <span className="field-error" id="companyNameErr" aria-live="polite">
                        {errors.companyName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Common Row 2: Work email & Mobile number */}
                <div className="enquiry-two-col">
                  <div className="enquiry-field">
                    <label htmlFor="enquiryWorkEmail">Work email *</label>
                    <input
                      type="email"
                      id="enquiryWorkEmail"
                      name="workEmail"
                      required
                      autoComplete="email"
                      placeholder="e.g. priya.sharma@company.com"
                      value={commonFields.workEmail}
                      onChange={handleCommonChange}
                      aria-invalid={!!errors.workEmail}
                      aria-describedby={errors.workEmail ? "workEmailErr" : undefined}
                    />
                    {errors.workEmail && (
                      <span className="field-error" id="workEmailErr" aria-live="polite">
                        {errors.workEmail}
                      </span>
                    )}
                  </div>

                  <div className="enquiry-field">
                    <label htmlFor="enquiryPhone">
                      Mobile number <small>(optional)</small>
                    </label>
                    <input
                      type="tel"
                      id="enquiryPhone"
                      name="phone"
                      autoComplete="tel"
                      placeholder="e.g. 9876543210"
                      value={commonFields.phone}
                      onChange={handleCommonChange}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phoneErr" : undefined}
                    />
                    {errors.phone && (
                      <span className="field-error" id="phoneErr" aria-live="polite">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* TALENT SPECIFIC FIELDS */}
                {mode === "talent" && (
                  <>
                    <div className="enquiry-two-col">
                      <div className="enquiry-field">
                        <label htmlFor="enquirySpecialism">Specialism *</label>
                        <select
                          id="enquirySpecialism"
                          name="specialism"
                          required
                          value={talentFields.specialism}
                          onChange={handleTalentChange}
                          aria-invalid={!!errors.specialism}
                          aria-describedby={errors.specialism ? "specialismErr" : undefined}
                        >
                          <option value="">Select an area</option>
                          {TALENT_SPECIALISMS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        {errors.specialism && (
                          <span className="field-error" id="specialismErr" aria-live="polite">
                            {errors.specialism}
                          </span>
                        )}
                      </div>

                      <div className="enquiry-field">
                        <label htmlFor="enquiryHiringModel">Hiring model *</label>
                        <select
                          id="enquiryHiringModel"
                          name="hiringModel"
                          required
                          value={talentFields.hiringModel}
                          onChange={handleTalentChange}
                          aria-invalid={!!errors.hiringModel}
                          aria-describedby={errors.hiringModel ? "hiringModelErr" : undefined}
                        >
                          <option value="">Select a model</option>
                          {TALENT_HIRING_MODELS.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                        {errors.hiringModel && (
                          <span className="field-error" id="hiringModelErr" aria-live="polite">
                            {errors.hiringModel}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="enquiry-field">
                      <label htmlFor="enquiryTeamSize">
                        Team size <small>(optional)</small>
                      </label>
                      <input
                        type="text"
                        id="enquiryTeamSize"
                        name="teamSize"
                        placeholder="e.g. 3 SAP IS-U consultants, 1 AI engineer"
                        value={talentFields.teamSize}
                        onChange={handleTalentChange}
                        aria-invalid={!!errors.teamSize}
                        aria-describedby={errors.teamSize ? "teamSizeErr" : undefined}
                      />
                      {errors.teamSize && (
                        <span className="field-error" id="teamSizeErr" aria-live="polite">
                          {errors.teamSize}
                        </span>
                      )}
                    </div>

                    <div className="enquiry-field">
                      <label htmlFor="enquiryMessage">What does success look like? *</label>
                      <textarea
                        id="enquiryMessage"
                        name="message"
                        required
                        rows={4}
                        placeholder="Share the roles, outcomes, timing and anything important about your environment."
                        value={talentFields.message}
                        onChange={handleTalentChange}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "talentMessageErr" : undefined}
                      />
                      {errors.message && (
                        <span className="field-error" id="talentMessageErr" aria-live="polite">
                          {errors.message}
                        </span>
                      )}
                    </div>
                  </>
                )}

                {/* TECHNOLOGY SERVICES SPECIFIC FIELDS (Services, Expertise, Solutions) */}
                {mode === "technology" && (
                  <>
                    <div className="enquiry-two-col">
                      <div className="enquiry-field">
                        <label htmlFor="enquiryCategory">Capability Area *</label>
                        <select
                          id="enquiryCategory"
                          name="category"
                          required
                          value={technologyFields.category}
                          onChange={handleTechnologyChange}
                          aria-invalid={!!errors.category}
                          aria-describedby={errors.category ? "categoryErr" : undefined}
                        >
                          {TECHNOLOGY_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <span className="field-error" id="categoryErr" aria-live="polite">
                            {errors.category}
                          </span>
                        )}
                      </div>

                      <div className="enquiry-field">
                        <label htmlFor="enquiryTopic">Practice or Focus</label>
                        <select
                          id="enquiryTopic"
                          name="topic"
                          value={technologyFields.topic}
                          onChange={handleTechnologyChange}
                          aria-invalid={!!errors.topic}
                          aria-describedby={errors.topic ? "topicErr" : undefined}
                        >
                          <option value="">General {technologyFields.category} Consultation</option>
                          {availableTopics.map((topic) => (
                            <option key={topic} value={topic}>
                              {topic}
                            </option>
                          ))}
                        </select>
                        {errors.topic && (
                          <span className="field-error" id="topicErr" aria-live="polite">
                            {errors.topic}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="enquiry-field">
                      <label htmlFor="enquiryTechScope">
                        Expected Timeline or Scope <small>(optional)</small>
                      </label>
                      <input
                        type="text"
                        id="enquiryTechScope"
                        name="scope"
                        placeholder="e.g. Q4 2026 rollout, migration discovery, 6-month roadmap"
                        value={technologyFields.scope}
                        onChange={handleTechnologyChange}
                        aria-invalid={!!errors.scope}
                        aria-describedby={errors.scope ? "scopeErr" : undefined}
                      />
                      {errors.scope && (
                        <span className="field-error" id="scopeErr" aria-live="polite">
                          {errors.scope}
                        </span>
                      )}
                    </div>

                    <div className="enquiry-field">
                      <label htmlFor="enquiryMessage">Project requirements *</label>
                      <textarea
                        id="enquiryMessage"
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell us what you want to achieve, timelines, and current technology landscape."
                        value={technologyFields.message}
                        onChange={handleTechnologyChange}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "techMessageErr" : undefined}
                      />
                      {errors.message && (
                        <span className="field-error" id="techMessageErr" aria-live="polite">
                          {errors.message}
                        </span>
                      )}
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <div className="enquiry-submit-row">
                  <button
                    type="submit"
                    className="btn btn-primary enquiry-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : mode === "talent"
                      ? "Send Talent Request"
                      : "Send Technology Enquiry"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
