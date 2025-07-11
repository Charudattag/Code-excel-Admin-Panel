import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
} from "react-bootstrap";
import {
  FaUsers,
  FaBook,
  FaGraduationCap,
  FaChartLine,
  FaPlay,
  FaClock,
  FaStar,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CountUp from "react-countup";
import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";

import Loader from "../../Component/Loader/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalLessons: 0,
    totalRevenue: 0,
    activeEnrollments: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);

  const chartColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const statusColors = {
    active: "success",
    pending: "warning",
    completed: "primary",
    inactive: "secondary",
  };

  // Mock data for LMS dashboard
  const mockData = {
    stats: {
      totalStudents: 1247,
      totalCourses: 89,
      totalLessons: 1245,
      totalRevenue: 125000,
      activeEnrollments: 892,
    },
    recentCourses: [
      {
        title: "JavaScript Fundamentals",
        instructor: "John Doe",
        students: 156,
        status: "active",
      },
      {
        title: "React Development",
        instructor: "Jane Smith",
        students: 203,
        status: "active",
      },
      {
        title: "Python for Beginners",
        instructor: "Mike Johnson",
        students: 98,
        status: "pending",
      },
      {
        title: "Data Science Basics",
        instructor: "Sarah Wilson",
        students: 134,
        status: "active",
      },
      {
        title: "Web Design Mastery",
        instructor: "David Brown",
        students: 87,
        status: "active",
      },
    ],
    recentEnrollments: [
      {
        id: "ENR001",
        student: "Alice Johnson",
        course: "JavaScript Fundamentals",
        date: "2024-01-15",
        status: "active",
      },
      {
        id: "ENR002",
        student: "Bob Smith",
        course: "React Development",
        date: "2024-01-14",
        status: "active",
      },
      {
        id: "ENR003",
        student: "Carol Davis",
        course: "Python for Beginners",
        date: "2024-01-13",
        status: "pending",
      },
      {
        id: "ENR004",
        student: "David Wilson",
        course: "Data Science Basics",
        date: "2024-01-12",
        status: "active",
      },
      {
        id: "ENR005",
        student: "Eva Brown",
        course: "Web Design Mastery",
        date: "2024-01-11",
        status: "completed",
      },
    ],
    enrollmentData: [
      { month: "Jan", newStudents: 120, completedCourses: 85 },
      { month: "Feb", newStudents: 145, completedCourses: 92 },
      { month: "Mar", newStudents: 98, completedCourses: 78 },
      { month: "Apr", newStudents: 167, completedCourses: 134 },
      { month: "May", newStudents: 134, completedCourses: 98 },
      { month: "Jun", newStudents: 189, completedCourses: 156 },
    ],
  };

  useEffect(() => {
    // Check for frontend authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userData = localStorage.getItem("userData");

    if (!isAuthenticated || !userData) {
      navigate("/");
      return;
    }

    // Optional: Check session expiration
    try {
      const user = JSON.parse(userData);
      const loginTime = new Date(user.loginTime);
      const now = new Date();
      const hoursDiff = (now - loginTime) / (1000 * 60 * 60);

      if (hoursDiff > 24) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userData");
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userData");
      navigate("/");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Use mock data instead of API call
        const { data } = { data: mockData };

        setStats(data.stats);
        setRecentCourses(data.recentCourses);
        setRecentEnrollments(data.recentEnrollments);
        setEnrollmentData(data.enrollmentData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <Loader message="Loading LMS Dashboard..." />;
  }

  return (
    <Container fluid className="dashboard-container p-4">
      <Row className="stats-row mb-4">
        <Col md={6} lg={4} className="mb-3">
          <Card className="dashboard-card border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Students</h6>
                  <h3 className="mb-0">
                    <CountUp
                      end={stats.totalStudents}
                      duration={2.5}
                      separator=","
                    />
                  </h3>
                </div>
                <div className="stat-icon bg-primary bg-opacity-10 p-3 rounded">
                  <FaUsers className="text-primary" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card className="dashboard-card border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Courses</h6>
                  <h3 className="mb-0">
                    <CountUp
                      end={stats.totalCourses}
                      duration={2.5}
                      separator=","
                    />
                  </h3>
                </div>
                <div className="stat-icon bg-success bg-opacity-10 p-3 rounded">
                  <FaBook className="text-success" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card className="dashboard-card border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Lessons</h6>
                  <h3 className="mb-0">
                    <CountUp
                      end={stats.totalLessons}
                      duration={2.5}
                      separator=","
                    />
                  </h3>
                </div>
                <div className="stat-icon bg-info bg-opacity-10 p-3 rounded">
                  <FaPlay className="text-info" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={12} className="mb-4">
          <Card className="dashboard-card border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title">Enrollment Overview</h5>
                <div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-2"
                  >
                    Monthly
                  </Button>
                </div>
              </div>
              <div style={{ height: "300px", width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={enrollmentData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorNewStudents"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorCompletedCourses"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="newStudents"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorNewStudents)"
                      name="New Students"
                      animationDuration={1500}
                    />
                    <Area
                      type="monotone"
                      dataKey="completedCourses"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorCompletedCourses)"
                      name="Completed Courses"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6} className="mb-4">
          <Card className="dashboard-card border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title">Recent Courses</h5>
                <Button variant="outline-primary" size="sm">
                  View All
                </Button>
              </div>
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Instructor</th>
                      <th>Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCourses.map((course, index) => (
                      <tr key={index}>
                        <td>{course.title}</td>
                        <td>{course.instructor}</td>
                        <td>{course.students}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="dashboard-card border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title">Recent Enrollments</h5>
                <Button variant="outline-primary" size="sm">
                  View All
                </Button>
              </div>
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEnrollments.map((enrollment, index) => (
                      <tr key={index}>
                        <td>{enrollment.student}</td>
                        <td>{enrollment.course}</td>
                        <td>{enrollment.date}</td>
                        <td>
                          <Badge bg={statusColors[enrollment.status]}>
                            {enrollment.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
