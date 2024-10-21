export const status = (Id) => {
    let statusId = parseInt(Id);
    if (statusId === 0) return "Pending";
    else if (statusId === 1) return "Active";
    else if (statusId === 2) return "Inactive";
    else if (statusId === 3) return "Suspended";
    else if (statusId === 4) return "Deleted";
};

export const LIMIT = 10;
export const adsLIMIT = 5;

export const totalPageCalculator = (total, limit) => {
    const pages = [];
    for (let x = 1; x <= Math.ceil(total / limit); x++) {
        pages.push(x);
    }
    return pages;
}