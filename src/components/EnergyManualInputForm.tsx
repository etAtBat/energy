"use client"
import React, { FormEvent, useState } from "react";
import { useAuth } from "react-oidc-context";

export const EnergyManualInput = () => {
  const auth = useAuth();
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
          accessToken: auth.user?.access_token,
          userId: auth?.user?.profile?.sub
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      alert("Success");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form id="manual-energy-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="value">Usage (kWh):</label>
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
          />
      </div>
      <div>
      <label htmlFor="start">Usage date:</label>
        <input
          type="date"
          id="usage-date"
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