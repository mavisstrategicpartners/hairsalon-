export const PRODUCT_CATEGORIES = ['Bundles', 'Closures', 'Frontals', 'Wigs', 'Bobs'] as const
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export const ORDER_STATUSES = ['pending', 'processing', 'paid', 'shipped', 'delivered'] as const
export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const PAYMENT_METHODS = ['eft'] as const
export type PaymentMethod = (typeof PAYMENT_METHODS)[number]

export const PAYMENT_STATUSES = ['pending', 'completed'] as const
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number]

export function isProductCategory(value: unknown): value is ProductCategory {
  return typeof value === 'string' && (PRODUCT_CATEGORIES as readonly string[]).includes(value)
}

export function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === 'string' && (ORDER_STATUSES as readonly string[]).includes(value)
}

export function isPaymentStatus(value: unknown): value is PaymentStatus {
  return typeof value === 'string' && (PAYMENT_STATUSES as readonly string[]).includes(value)
}

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

export type ProductRow = {
  id: string
  slug: string
  name: string
  price: number
  category: ProductCategory
  tag: string | null
  image: string | null
  description: string | null
  length: string | null
  lengths: string[]
  specs: Record<string, Json>
  active: boolean
  created_at: string
  updated_at: string
}

/**
 * Snapshot of a purchased line. Prices here are the server-verified ones.
 * `product_id` is null for studio service vouchers, which are static frontend
 * content rather than rows in `products`.
 */
export type OrderItemSnapshot = {
  product_id: string | null
  kind: 'product' | 'service'
  slug: string
  name: string
  unit_price: number
  quantity: number
  line_total: number
  length: string | null
}

export type OrderRow = {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  customer_address: string | null
  customer_city: string | null
  customer_postal_code: string | null
  items: OrderItemSnapshot[]
  subtotal: number
  shipping: number
  total: number
  status: OrderStatus
  payment_method: PaymentMethod
  payment_status: PaymentStatus
  created_at: string
  updated_at: string
}

export type UserRoleRow = {
  id: string
  user_id: string
  role: 'admin'
  created_at: string
}

export type AuditLogRow = {
  id: string
  actor_id: string | null
  actor_email: string | null
  action: string
  entity: string
  entity_id: string | null
  details: Record<string, Json>
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      products: {
        Row: ProductRow
        Insert: Partial<Pick<ProductRow, 'id' | 'created_at' | 'updated_at'>> &
          Omit<ProductRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ProductRow, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
      orders: {
        Row: OrderRow
        Insert: Partial<
          Pick<
            OrderRow,
            'id' | 'order_number' | 'created_at' | 'updated_at' | 'status' | 'payment_status'
          >
        > &
          Omit<
            OrderRow,
            'id' | 'order_number' | 'created_at' | 'updated_at' | 'status' | 'payment_status'
          >
        /** Only lifecycle fields are updatable; money and captured details are fixed. */
        Update: Partial<Pick<OrderRow, 'status' | 'payment_status'>>
        Relationships: []
      }
      user_roles: {
        Row: UserRoleRow
        Insert: Omit<UserRoleRow, 'id' | 'created_at'> &
          Partial<Pick<UserRoleRow, 'id' | 'created_at'>>
        Update: Partial<Omit<UserRoleRow, 'id' | 'created_at'>>
        Relationships: []
      }
      audit_logs: {
        Row: AuditLogRow
        Insert: Omit<AuditLogRow, 'id' | 'created_at'> &
          Partial<Pick<AuditLogRow, 'id' | 'created_at'>>
        Update: Partial<Omit<AuditLogRow, 'id' | 'created_at'>>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      next_order_number: {
        Args: Record<string, never>
        Returns: string
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
