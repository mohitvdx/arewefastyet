/*
Copyright 2023 The Vitess Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from "react";
import { useParams } from "react-router-dom";
import useApiCall from "../../utils/Hook";
import RingLoader from "react-spinners/RingLoader";

import "../SinglePR/singlePR.css";

import { formatDate, errorApi } from "../../utils/Utils";

const SinglePR = () => {
  const { pull_nb } = useParams();

  const {
    data: dataSinglePr,
    isLoading: singlePrLoading,
    error: singlePrError,
  } = useApiCall(`${import.meta.env.VITE_API_URL}pr/info/${pull_nb}`, []);

  return (
    <div className="singlePR flex--column">
      {singlePrError ? (
        <div className="apiError">{errorApi}</div>
      ) : singlePrLoading ? (
        <div className="loadingSpinner">
          <RingLoader loading={singlePrLoading} color="#E77002" size={300} />
        </div>
      ) : (
        <>
          <div className="singlePR__top flex">
            <div>
              <h2>
                [#{pull_nb}]{dataSinglePr.Title}
              </h2>
              <span>
                By {dataSinglePr.Author} at {formatDate(dataSinglePr.CreateAt)}{" "}
              </span>
            </div>

            <div className="singlePR__link justify--content">
              <a
                href={`/compare?ltag=${dataSinglePr.Base}&rtag=${dataSinglePr.Head}`}
              >
                Compare with base commit
              </a>
            </div>
          </div>
          <div className="singlePR__bottom flex--column">
            <span>Base: {dataSinglePr.Base}</span>
            <span>Head: {dataSinglePr.Head}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePR;
