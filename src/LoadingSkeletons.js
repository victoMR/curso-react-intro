// LoadingSkeleton.js
import React from "react";
import "./LoadingSkeleton.css";

function LoadingSkeleton({ numberOfSkeletons }) {
  const skeletons = Array.from({ length: numberOfSkeletons }, (_, index) => (
    // describamos mas el codigo anterior
    // Array.from crea un array a partir de un objeto iterable
    // el primer parametro es el objeto iterable
    // el segundo parametro es una funcion que recibe dos parametros
    <div key={index} className="SkeletonItem"></div>
  ));

  return <div className="SkeletonContainer">{skeletons}</div>;
}

export default LoadingSkeleton;
