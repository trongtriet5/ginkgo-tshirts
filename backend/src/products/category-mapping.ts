// Mapping from UDF5_STRING prefix (FABRIC.GENDER.CATEGORY.STYLE)
// to TYPE_NAME_DETAIL_EN and TYPE_NAME_GROUP
// Key: `{fabric}.{gender}.{categoryCode}.{style}`
export const CATEGORY_MAP: Record<string, { typeDetail: string; typeGroup: string }> = {
  // GBA
  'GBA.KID.TSO.ONE':  { typeDetail: 'T-Shirt Oversized', typeGroup: 'T-Shirt' },
  'GBA.KID.TSS.ONE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GBA.MEN.TSO.ONE':  { typeDetail: 'T-Shirt Oversized', typeGroup: 'T-Shirt' },
  'GBA.MEN.TSP.ONE':  { typeDetail: 'T-shirts Pocket Short Sleeves', typeGroup: 'T-Shirt' },
  'GBA.MEN.TSS.ONE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GBA.WOM.CRO.ONE':  { typeDetail: 'Crop Top Short Sleeves Crew Neck Oversized', typeGroup: 'Short' },
  'GBA.WOM.PZE.ONE':  { typeDetail: 'Plus Size', typeGroup: 'Plus Size' },

  // GCA
  'GCA.UNI.BAG.SHB':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },

  // GCL
  'GCL.MEN.TSO.ONE':  { typeDetail: 'T-Shirt Oversized', typeGroup: 'T-Shirt' },
  'GCL.WOM.CRO.ONE':  { typeDetail: 'Crop Top Short Sleeves Crew Neck Oversized', typeGroup: 'Short' },

  // GCV
  'GCV.MEN.SIS.BUT':  { typeDetail: 'Shirt Short Sleeves', typeGroup: 'Shirt' },
  'GCV.WOM.BLA.BNE':  { typeDetail: 'Blouse Long Sleeves Asymmetrical', typeGroup: 'Blouse' },
  'GCV.WOM.BLB.ONE':  { typeDetail: 'Blouse Open Back Short Sleeves', typeGroup: 'Blouse' },
  'GCV.WOM.BLC.ONE':  { typeDetail: 'Blouse Crop Top', typeGroup: 'Blouse' },

  // GFI
  'GFI.KID.SWL.ONE':  { typeDetail: 'Sweatshirt long sleeves', typeGroup: 'Shirt' },
  'GFI.MEN.HLS.ONE':  { typeDetail: 'Hoodies long sleeves', typeGroup: 'Hoodie' },
  'GFI.MEN.SHS.EBT':  { typeDetail: 'Short men straight', typeGroup: 'Short' },
  'GFI.MEN.SWL.ONE':  { typeDetail: 'Sweatshirt long sleeves', typeGroup: 'Shirt' },

  // GFN
  'GFN.KID.SHS.EBT':  { typeDetail: 'Short men straight', typeGroup: 'Short' },
  'GFN.KID.SWL.ONE':  { typeDetail: 'Sweatshirt long sleeves', typeGroup: 'Shirt' },
  'GFN.MEN.SHS.EBT':  { typeDetail: 'Short men straight', typeGroup: 'Short' },
  'GFN.MEN.SWL.ONE':  { typeDetail: 'Sweatshirt long sleeves', typeGroup: 'Shirt' },

  // GKK
  'GKK.WOM.SHD.FBT':  { typeDetail: 'Short women curved', typeGroup: 'Short' },
  'GKK.WOM.SHH.FBT':  { typeDetail: 'High waist Short', typeGroup: 'Short' },

  // GLI
  'GLI.MEN.PAF.BBT':  { typeDetail: 'Pants slim fit', typeGroup: 'Pants' },
  'GLI.MEN.SHS.BBT':  { typeDetail: 'Short men straight', typeGroup: 'Short' },
  'GLI.MEN.SIS.CLA':  { typeDetail: 'Shirt Short Sleeves', typeGroup: 'Shirt' },
  'GLI.MEN.SIS.MAN':  { typeDetail: 'Shirt Short Sleeves', typeGroup: 'Shirt' },

  // GOR
  'GOR.KID.TSS.ONE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GOR.MEN.HCN.ONE':  { typeDetail: 'T-Shirt Crew Neck', typeGroup: 'T-Shirt' },
  'GOR.MEN.POL.MAN':  { typeDetail: 'Polo Short sleeves', typeGroup: 'Polo' },
  'GOR.MEN.TSP.ONE':  { typeDetail: 'T-shirts Pocket Short Sleeves', typeGroup: 'T-Shirt' },
  'GOR.MEN.TSS.HNE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GOR.MEN.TSS.ONE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GOR.WOM.PZE.ONE':  { typeDetail: 'Plus Size', typeGroup: 'Plus Size' },
  'GOR.WOM.TSB.ONE':  { typeDetail: 'T-Shirt Open Back', typeGroup: 'T-Shirt' },
  'GOR.WOM.TSS.VNE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GOR.WOM.TTB.BNE':  { typeDetail: 'Tanktop Open Back', typeGroup: 'Tank Top' },

  // GPI
  'GPI.MEN.POL.MAN':  { typeDetail: 'Polo Short sleeves', typeGroup: 'Polo' },
  'GPI.MEN.POL.RIB':  { typeDetail: 'Polo Short sleeves', typeGroup: 'Polo' },

  // GSL
  'GSL.KID.APP.BNE':  { typeDetail: 'Apple', typeGroup: 'Apple' },
  'GSL.KID.TSS.ONE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GSL.KID.TTS.ONE':  { typeDetail: 'Tank Top Sleeveless', typeGroup: 'Tank Top' },
  'GSL.MEN.TTS.ONE':  { typeDetail: 'Tank Top Sleeveless', typeGroup: 'Tank Top' },
  'GSL.WOM.APP.BNE':  { typeDetail: 'Apple', typeGroup: 'Apple' },
  'GSL.WOM.FZE.BNE':  { typeDetail: 'Freesize', typeGroup: 'Freesize' },
  'GSL.WOM.TSB.ONE':  { typeDetail: 'T-Shirt Open Back', typeGroup: 'T-Shirt' },
  'GSL.WOM.TSS.VNE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GSL.WOM.TTS.ONE':  { typeDetail: 'Tank Top Sleeveless', typeGroup: 'Tank Top' },

  // GSP
  'GSP.KID.TSS.ONE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GSP.MEN.POL.MAN':  { typeDetail: 'Polo Short sleeves', typeGroup: 'Polo' },
  'GSP.MEN.TSS.ONE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GSP.WOM.PZE.ONE':  { typeDetail: 'Plus Size', typeGroup: 'Plus Size' },
  'GSP.WOM.SKS.EBT':  { typeDetail: 'Slit Pencil Skirt', typeGroup: 'Skirt' },

  // GSU
  'GSU.KID.TSS.ONE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GSU.MEN.POL.MAN':  { typeDetail: 'Polo Short sleeves', typeGroup: 'Polo' },
  'GSU.MEN.TSS.ONE':  { typeDetail: 'T-Shirt Short Sleeves', typeGroup: 'T-Shirt' },
  'GSU.WOM.PZE.ONE':  { typeDetail: 'Plus Size', typeGroup: 'Plus Size' },
  'GSU.WOM.TSP.ONE':  { typeDetail: 'T-shirts Pocket Short Sleeves', typeGroup: 'T-Shirt' },
  'GSU.WOM.TTB.BNE':  { typeDetail: 'Tanktop Open Back', typeGroup: 'Tank Top' },

  // OTH - Accessories
  'OTH.UNI.BAG.CRB':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.BAG.DRB':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.BAG.OTH':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.BAG.PCE':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.BAG.TTB':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.FWR.SLI':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.HDR.COA':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.HDR.CUS':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.HDR.SAS':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.HWR.BSE':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.HWR.CAP':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.HWR.HEA':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.HWR.NLH':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.SCA.SCS':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.SOU.ECV':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.SOU.HFP':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.SOU.HFS':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.SOU.LUG':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.SOU.MUG':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.SOU.NBI':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.SOU.NBP':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.SOU.NBS':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.SOU.PLC':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
  'OTH.UNI.SOU.POS':  { typeDetail: 'Accessories', typeGroup: 'Accessories' },
};

/** Extract the 4-part prefix (FABRIC.GENDER.CATEGORY.STYLE) from a UDF5_STRING code */
export function getCodePrefix(code: string): string {
  const parts = code.split('.');
  if (parts.length < 4) return '';
  return parts.slice(0, 4).join('.');
}

/** Look up type detail and group for a given UDF5_STRING code */
export function lookupCategory(code: string): { typeDetail: string; typeGroup: string } | null {
  const prefix = getCodePrefix(code);
  return CATEGORY_MAP[prefix] || null;
}

/** Build a list of all unique type groups in the mapping */
export function getAllTypeGroups(): string[] {
  const groups = new Set<string>();
  for (const entry of Object.values(CATEGORY_MAP)) {
    groups.add(entry.typeGroup);
  }
  return Array.from(groups).sort();
}

/** Build a list of code prefixes for a given type group */
export function getPrefixesForGroup(typeGroup: string): string[] {
  const result: string[] = [];
  for (const [prefix, entry] of Object.entries(CATEGORY_MAP)) {
    if (entry.typeGroup === typeGroup) {
      result.push(prefix);
    }
  }
  return result;
}
