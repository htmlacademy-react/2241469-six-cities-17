import { useState, useCallback, ChangeEvent } from 'react';
import { ReviewToSend } from '../data/types/offer';
import { MAX_LEN_COMMENT, MIN_RATING } from '../const';


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

  const isValid = formData.rating > MIN_RATING && formData.comment.trim().length >= MAX_LEN_COMMENT;

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
