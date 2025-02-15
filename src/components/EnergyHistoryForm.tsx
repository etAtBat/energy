"use client"
import React, { FormEvent, useState } from "react";
import { useAuth } from "react-oidc-context";

export const EnergyHistoryForm = () => {
  const auth = useAuth();
  const [datepickerStartValue, updateDatepickerStartValue] = useState('');
  const [datepickerEndValue, updateDatepickerEndValue] = useState('');
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch('/api/alerts', {
        method: "POST",
        body: JSON.stringify({
          startDate: datepickerStartValue,
          endDate: datepickerEndValue,
          accessToken: auth.user?.access_token,
          userId: auth?.user?.profile?.sub
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      alert("Success");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form id="manual-history-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="start">Retreive energy usage start date</label>
          <input
            type="date"
            id="start"
            value={datepickerStartValue}
            min="2020-01-01"
            max="2026-12-31"
            onChange={(event) => {
              const selectedDate = event?.target?.value;
              if (selectedDate) {
                updateDatepickerStartValue(selectedDate);
              }
            }}
          />
        </div>
        <div>
        <label htmlFor="start">Retreive energy usage end date</label>
          <input
            type="date"
            id="end"
            value={datepickerEndValue}
            min="2020-01-01"
            max="2026-12-31"
            onChange={(event) => {
              const selectedDate = event?.target?.value;
              if (selectedDate) {
                updateDatepickerEndValue(selectedDate);
              }
            }}
          />
        </div>
      <button type="submit">Submit</button>
    </form>
  );
}