"use client"
import React, { FormEvent, useState } from "react";
import { useAuth } from "react-oidc-context";

export const EnergyHistoryForm = () => {
  const auth = useAuth();
  const [datepickerStartValue, updateDatepickerStartValue] = useState('');
  const [datepickerEndValue, updateDatepickerEndValue] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userHistoricalItems, updateUserHistoricalItems] = useState([]) as Array<any>;
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/energy/history?startDate=${datepickerStartValue}&endDate=${datepickerEndValue}&accessToken=${auth.user?.access_token}&userId=${auth?.user?.profile?.sub}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const userItems = data?.items?.data;
      if (Array.isArray(userItems)) {
        updateUserHistoricalItems(userItems);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h3 className="title">Retreive energy data by date: </h3>
      <form id="manual-history-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="start">Retreive energy usage start date: </label>
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
          <label htmlFor="start">Retreive energy usage end date: </label>
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
      {
        userHistoricalItems?.length ?
           (
            <table id="historical-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Date</th>
                  <th>Usage</th>
                  <th>Threshold</th>
                </tr>
              </thead>
              <tbody>
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  userHistoricalItems.map((item: any) => {
                    const {
                      threshold,
                      date,
                      usage,
                      userId,
                    } = item;
                    return (
                      <tr key={`${userId}-${date}`}>
                        <td>{userId}</td>
                        <td>{date}</td>
                        <td>{usage}</td>
                        <td>{threshold}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )
          : null
      }
    </>
  );
}