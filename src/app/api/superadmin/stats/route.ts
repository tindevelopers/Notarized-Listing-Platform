import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get the current user session first
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    console.log("Superadmin API: Session check:", {
      hasSession: !!session,
      sessionError: sessionError?.message,
      userEmail: session?.user?.email,
    });

    if (sessionError || !session?.user) {
      console.log("Superadmin API: No valid session found");
      return NextResponse.json(
        { error: "Unauthorized - No valid session" },
        { status: 401 },
      );
    }

    const user = session.user;

    // Check if user is superadmin
    const superAdminEmails = [
      "admin@notarized.com",
      "superadmin@notarized.com",
      "support@notarized.com",
    ];

    const isSuperAdmin =
      superAdminEmails.includes(user.email || "") ||
      user.email?.endsWith("@notarized.com") ||
      user.user_metadata?.role === "superadmin";

    if (!isSuperAdmin) {
      return NextResponse.json(
        { error: "Forbidden - Superadmin access required" },
        { status: 403 },
      );
    }

    // For now, return mock data
    // In a real implementation, these would be calculated from the database
    const stats = {
      totalTransactions: 2500,
      totalInvoiceValue: 125000,
      activeNotaries: 50,
      totalNotaryApplications: 55,
      totalClients: 1500,
      averageClientValue: 40.0,
      monthlyInvoiceTotal: 50000,
      monthlyInvoiceCount: 1000,
      monthlyPayments: 20000,
      monthlyPaymentCount: 500,
      pendingNotaries: 2,
      pendingTransactions: 25,
      pendingInvoices: 15,
      lastMonthInvoice: 35000,
      lastMonthPayment: 17500,
      invoiceGrowth: 30,
      paymentGrowth: 13.5,
    };

    /* 
    // Real implementation would query the database like this:
    
    // Get total notaries
    const { count: totalNotaries } = await supabase
      .from('notaries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    // Get pending notaries
    const { count: pendingNotaries } = await supabase
      .from('notaries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get total transactions
    const { count: totalTransactions } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    // Get monthly revenue
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const { data: monthlyRevenue } = await supabase
      .from('bookings')
      .select('total_cost')
      .eq('status', 'completed')
      .gte('created_at', `${currentMonth}-01`)
      .lt('created_at', `${currentMonth}-32`);

    const monthlyTotal = monthlyRevenue?.reduce((sum, booking) => 
      sum + (booking.total_cost || 0), 0) || 0;
    */

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Superadmin stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
