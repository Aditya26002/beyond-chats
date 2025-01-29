"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaRegBuilding } from "react-icons/fa";
import { FiLink } from "react-icons/fi";

export default function SetupOrganisation({
  nextStep,
  prevStep,
  updateUserData,
}) {
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [scrapedPages, setScrapedPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isScrapingStarted, setIsScrapingStarted] = useState(false);
  const [isScrapingComplete, setIsScrapingComplete] = useState(false);
  const [urlError, setUrlError] = useState("");

  const validateUrl = (url) => {
    if (!url) {
      setUrlError("Website URL is required");
      return false;
    }
    try {
      new URL(url);
      setUrlError("");
      return true;
    } catch {
      setUrlError("Please enter a valid website URL");
      return false;
    }
  };

  const handleWebsiteChange = (e) => {
    const value = e.target.value;
    setCompanyWebsite(value);
    setUrlError("");
  };

  const handleStartScraping = () => {
    if (!companyWebsite) {
      alert(
        "Please enter a company website URL before starting the scraping process."
      );
      return;
    }

    setIsScrapingStarted(true);
    // Simulating website scraping
    const pagesToScrape = ["/home", "/about", "/products", "/contact"];
    const initialPages = pagesToScrape.map((url) => ({
      url,
      status: "pending",
    }));
    setScrapedPages(initialPages);

    // Simulate scraping process
    initialPages.forEach((page, index) => {
      setTimeout(() => {
        setScrapedPages((prevPages) =>
          prevPages.map((p, i) =>
            i === index ? { ...p, status: "scraped" } : p
          )
        );
        if (index === initialPages.length - 1) {
          setIsScrapingComplete(true);
        }
      }, (index + 1) * 1500); // Stagger the updates
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUrl(companyWebsite)) {
      return;
    }
    updateUserData({ companyName, companyWebsite, companyDescription });
    nextStep();
  };

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Setup Organisation
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="companyName" className=" block mb-1">
            Company Name
          </label>
          <div className="flex rounded-md border focus-within:border-2 focus-within:border-black">
            <div className="text-gray-400 bg-gray-100  h-full px-2 rounded-l-md py-2.5">
              <FaRegBuilding className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 pr-10 rounded-r-md outline-none border-none"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="companyWebsite" className="block mb-1">
            Company Website URL
          </label>
          <div
            className={`flex rounded-md border ${
              urlError
                ? "border-red-500"
                : "focus-within:border-2 focus-within:border-black"
            }`}
          >
            <div className="text-gray-400 bg-gray-100 h-full px-2 rounded-l-md py-2.5">
              <FiLink
                className={`w-5 h-5 ${
                  urlError ? "text-red-500" : "text-gray-400"
                }`}
              />
            </div>
            <input
              type="url"
              id="companyWebsite"
              value={companyWebsite}
              onChange={handleWebsiteChange}
              className="w-full px-3 py-2 pr-10 rounded-r-md outline-none border-none"
              required
            />
          </div>
          {urlError && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {urlError}
            </motion.p>
          )}
        </div>
        <div>
          <label htmlFor="companyDescription" className="block mb-1">
            Company Description
          </label>
          <textarea
            id="companyDescription"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            required
          />
        </div>
        {!isScrapingStarted && (
          <button
            type="button"
            onClick={handleStartScraping}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Start Website Scraping
          </button>
        )}
        {isScrapingStarted && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Scraped Pages</h3>
            <div className="grid grid-cols-2 gap-4">
              {scrapedPages.map((page) => (
                <motion.div
                  key={page.url}
                  className={`p-2 border rounded-md cursor-pointer ${
                    page.status === "scraped" ? "bg-green-100" : "bg-yellow-100"
                  }`}
                  onClick={() => handlePageClick(page)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{page.url}</p>
                  <p className="text-sm text-gray-500">{page.status}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {selectedPage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-2">
              Scraped Data for {selectedPage.url}
            </h3>
            <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
              {JSON.stringify(
                { title: "Sample Title", content: "Sample content..." },
                null,
                2
              )}
            </pre>
          </motion.div>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            disabled={!isScrapingComplete}
          >
            {isScrapingComplete
              ? "Next"
              : "Please wait for scraping to complete"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
