
import React from 'react';

import ReactPDF from "@react-pdf/renderer";

import { FC,PropsWithChildren } from "react";



export const Svg: FC<PropsWithChildren<ReactPDF.SVGProps>>= ({...props})=>(
    <ReactPDF.Svg {...props}/>
);
export const G: FC<PropsWithChildren<ReactPDF.GProps>>= ({...props})=>(
    <ReactPDF.G {...props}/>
);
export const ClipPath: FC<PropsWithChildren<ReactPDF.ClipPathProps>>= ({...props})=>(
    <ReactPDF.ClipPath {...props}/>
);