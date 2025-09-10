import React from 'react'
import clsx from 'clsx'

export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({ className, ...props }) => (
  <table className={clsx('w-full text-sm', className)} {...props} />
)

export const THead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => (
  <thead {...props} />
)

export const TBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => (
  <tbody {...props} />
)

export const TR: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = (props) => <tr className="border-b border-border" {...props} />

export const TH: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
  <th className={clsx('text-left p-3 font-semibold', className)} {...props} />
)

export const TD: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
  <td className={clsx('p-3 align-top', className)} {...props} />
)


