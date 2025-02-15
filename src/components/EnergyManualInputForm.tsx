"use client"
import React, { FormEvent, useState } from "react";
import { useAuth } from "react-oidc-context";

export const EnergyManualInput = () => {
  const auth = useAuth();
  // console.log('auth?.user?.profile?.sub');
  // console.log(auth?.user?.profile?.sub);
  const [datepickerValue, updateDatepickerValue] = useState('');
  const [usageValue, updateUsageValue] = useState('');
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('auth.user');
    console.log(auth.user);
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form id="manual-energy-form" onSubmit={onSubmit}>
      start form
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
      end form
    </form>
  );
}