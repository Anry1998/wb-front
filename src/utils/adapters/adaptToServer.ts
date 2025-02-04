// import { CompanyStatus } from "@/types/company.interface";
export type CompanyForm = {
  seller_name: string;
  marketplace_id: number;
  inn: number;
  nalog: number;
  forma_naloga: string;
  dni_vsego: number;
  dni_wb: number;
  group_id: number;
  // status: CompanyStatus;
};

export const adaptFileToServer = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
};
export const adaptAddCompanyToServer = (data: CompanyForm) => {
  const {
    seller_name,
    marketplace_id,
    group_id,
    forma_naloga,
    nalog,
    dni_vsego,
    dni_wb,
    inn,
    // status,
  } = data;
  return {
    // api_key: `${seller_name}-${inn}`,
    marketplace_id: marketplace_id,
    seller_name: seller_name,
    group_id: group_id,
    forma_naloga: forma_naloga,
    nalog: nalog,
    dni_vsego: dni_vsego,
    dni_wb: dni_wb,
    inn,
    // status,
  };
};

export const adaptEditCompanyToServer = (data: CompanyForm) => {
  const {
    group_id,
    seller_name,
    inn,
    dni_vsego,
    marketplace_id,
    dni_wb,
    forma_naloga,
    nalog,
  } = data;
  return {
    marketplace_id: marketplace_id,
    seller_name: seller_name,
    inn: inn,
    // status: status,
    dni_vsego: dni_vsego,
    dni_wb: dni_wb,
    forma_naloga: forma_naloga,
    nalog: nalog,
    group_id: group_id,
  };
};
