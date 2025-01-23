import { useState, useCallback, ChangeEvent } from 'react';
import { ReviewToSend } from '../data/types/offer';


export const useCommentForm = (initialData: ReviewToSend) => {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (key: keyof ReviewToSend) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
          ...prev,
          [key]: key === 'rating' ? Number(e.target.value) : e.target.value,
        }));
      },
    []
  );

  const isValid = formData.rating > 0 && formData.comment.trim().length >= 50;

  const resetForm = () => {
    setFormData(initialData);
  };

  const handleSubmit = async (onSubmit: (data: ReviewToSend) => Promise<void>) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(formData);
    } catch {
      setError('Ошибка отправки комментария');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, handleChange, isValid, handleSubmit, isSubmitting, resetForm , error};
};
