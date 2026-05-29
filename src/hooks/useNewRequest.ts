import { useCallback, useState } from "react";

type NewRequestForm = {
  name: string;
  molecule: string;
  quantity: string;
  company: string;
  notes: string;
};

export type NewRequestPayload = Omit<NewRequestForm, "quantity"> & {
  quantity: number;
};

const defaultForm: NewRequestForm = {
  name: "",
  molecule: "",
  quantity: "",
  company: "",
  notes: "",
};

export function useNewRequest(onSubmit: (payload: NewRequestPayload) => void) {
  const [form, setForm] = useState<NewRequestForm>(defaultForm);
  const [error, setError] = useState<string | null>(null);

  const setField = useCallback((field: keyof NewRequestForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError(null);
  }, []);

  const submit = useCallback(() => {
    if (
      !form.name.trim() ||
      !form.molecule.trim() ||
      !form.quantity.trim() ||
      !form.company.trim()
    ) {
      setError("Please fill all required fields.");
      return false;
    }

    const numberQuantity = Number(form.quantity);
    if (Number.isNaN(numberQuantity) || numberQuantity <= 0) {
      setError("Quantity must be a valid positive number.");
      return false;
    }

    onSubmit({
      name: form.name.trim(),
      molecule: form.molecule.trim(),
      quantity: numberQuantity,
      company: form.company.trim(),
      notes: form.notes.trim(),
    });

    setForm(defaultForm);
    setError(null);
    return true;
  }, [form, onSubmit]);

  const reset = useCallback(() => {
    setForm(defaultForm);
    setError(null);
  }, []);

  return {
    form,
    error,
    setField,
    submit,
    reset,
  };
}
