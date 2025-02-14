"use client"
import React, { FormEvent, useState } from "react";

export const ManualInput = () => {
  const [datepickerValue, updateDatepickerValue] = useState('');
  const [usageValue, updateUsageValue] = useState('');
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch('/api/energy/input', {
        method: "POST",
        body: JSON.stringify({
          date: datepickerValue,
          usage: usageValue,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form id="manual-energy-input" onSubmit={onSubmit}>
      <label htmlFor="start">Usage (kWh):</label>
      <input
        id="value"
        type="number"
        value={usageValue}
        onChange={(event) => {
          const selectedKWH = event?.target?.value;
          if (selectedKWH) {
            updateUsageValue(selectedKWH);
          }
        }}
        >
        </input>

      <label htmlFor="start">Start date:</label>
      <input
        type="date"
        id="start"
        name="trip-start"
        value={datepickerValue}
        min="2024-01-01"
        max="2026-12-31"
        onChange={(event) => {
          const selectedDate = event?.target?.value;
          if (selectedDate) {
            updateDatepickerValue(selectedDate);
          }
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}