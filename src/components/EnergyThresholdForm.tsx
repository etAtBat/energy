"use client"
import React, { FormEvent, useState } from "react";

export const EnergyThresholdForm = () => {
  const [datepickerValue, updateDatepickerValue] = useState('');
  const [thresholdValue, updateThresholdValue] = useState('');
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch('/api/alerts', {
        method: "POST",
        body: JSON.stringify({
          date: datepickerValue,
          threshold: thresholdValue,
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
    <form id="manual-threshold-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="value">Threshold value (kWh):</label>
        <input
          id="value"
          type="number"
          value={thresholdValue}
          onChange={(event) => {
            const selectedKWH = event?.target?.value;
            if (selectedKWH) {
              updateThresholdValue(selectedKWH);
            }
          }}
          />
      </div>
      <div>
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
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}